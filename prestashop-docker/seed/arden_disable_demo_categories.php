<?php
/**
 * Moves products off default PrestaShop demo categories (Clothes, Men, Women, Accessories, …)
 * and sets those categories inactive so they disappear from the category tree and search.
 *
 * Targets Arden catalog categories by link_rewrite (blank-apparel, blank-accessories, …).
 * Run after arden_live_parity.php (needs blanks subtree). Run as www-data:
 *   php /var/www/html/seed/arden_disable_demo_categories.php
 */

declare(strict_types=1);

define('_PS_CLI_', true);
$_SERVER['REQUEST_METHOD'] = 'GET';
if (!isset($_SERVER['HTTP_HOST']) || $_SERVER['HTTP_HOST'] === '') {
    $_SERVER['HTTP_HOST'] = getenv('PS_DOMAIN') ?: 'localhost:8081';
}
if (!isset($_SERVER['SERVER_NAME'])) {
    $_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];
}

require_once dirname(__FILE__) . '/../config/config.inc.php';

$idShop = (int) Configuration::get('PS_SHOP_DEFAULT');
$idLang = (int) Configuration::get('PS_LANG_DEFAULT');
$idHome = (int) Configuration::get('PS_HOME_CATEGORY');

Shop::setContext(Shop::CONTEXT_SHOP, $idShop);
$ctx = Context::getContext();
$ctx->shop = new Shop($idShop);
$ctx->language = new Language($idLang);

// Demo category link_rewrite => Arden target link_rewrite (fallback chain).
$rewriteMap = [
    'clothes' => ['blank-apparel'],
    'men' => ['t-shirts-core', 'blank-apparel'],
    'women' => ['t-shirts-core', 'blank-apparel'],
    'accessories' => ['blank-accessories', 'bags', 'blank-apparel'],
    'stationery' => ['print-services'],
    'home-accessories' => ['print-services'],
    'art' => ['dtf-transfers'],
];

$demoIdToTargetId = [];
foreach ($rewriteMap as $demoRw => $targetChain) {
    $demoId = categoryIdByRewrite($demoRw, $idLang);
    if ($demoId <= 0 || $demoId === $idHome) {
        continue;
    }
    $targetId = 0;
    foreach ($targetChain as $targetRw) {
        $targetId = categoryIdByRewrite($targetRw, $idLang);
        if ($targetId > 0) {
            break;
        }
    }
    if ($targetId <= 0) {
        fwrite(STDERR, "Skip demo category \"{$demoRw}\": no target found.\n");
        continue;
    }
    $demoIdToTargetId[$demoId] = $targetId;
    echo "Map CAT {$demoId} ({$demoRw}) -> CAT {$targetId}\n";
}

if ($demoIdToTargetId === []) {
    echo "No demo categories matched (already cleaned or different locale).\n";
    exit(0);
}

$demoIds = array_keys($demoIdToTargetId);
$demoIdList = implode(',', array_map('intval', $demoIds));
$fallbackTarget = (int) reset($demoIdToTargetId);

$productIds = Db::getInstance()->executeS(
    'SELECT DISTINCT `id_product` FROM `' . _DB_PREFIX_ . 'category_product`
     WHERE `id_category` IN (' . $demoIdList . ')'
);

if (!$productIds) {
    echo "No products linked to demo categories.\n";
} else {
    foreach ($productIds as $row) {
        $idProduct = (int) $row['id_product'];
        $links = Db::getInstance()->executeS(
            'SELECT `id_category`, `position` FROM `' . _DB_PREFIX_ . 'category_product`
             WHERE `id_product` = ' . $idProduct . ' ORDER BY `position` ASC'
        );
        if (!$links) {
            continue;
        }
        $newRows = [];
        foreach ($links as $link) {
            $cid = (int) $link['id_category'];
            $pos = (int) $link['position'];
            $mapped = isset($demoIdToTargetId[$cid]) ? $demoIdToTargetId[$cid] : $cid;
            $key = $mapped;
            if (!isset($newRows[$key])) {
                $newRows[$key] = $pos;
            }
        }
        if ($newRows === []) {
            $newRows[$fallbackTarget] = 0;
        }

        Db::getInstance()->delete('category_product', '`id_product` = ' . $idProduct);
        $pos = 0;
        foreach ($newRows as $idCat => $_oldPos) {
            Db::getInstance()->insert(
                'category_product',
                [
                    'id_category' => (int) $idCat,
                    'id_product' => $idProduct,
                    'position' => $pos++,
                ]
            );
        }

        $def = (int) Db::getInstance()->getValue(
            'SELECT `id_category_default` FROM `' . _DB_PREFIX_ . 'product` WHERE `id_product` = ' . $idProduct
        );
        if (isset($demoIdToTargetId[$def])) {
            $def = $demoIdToTargetId[$def];
        }
        if (!isset($newRows[$def])) {
            $keys = array_keys($newRows);
            $def = (int) $keys[0];
        }
        Db::getInstance()->update(
            'product',
            ['id_category_default' => $def],
            '`id_product` = ' . $idProduct
        );

        echo "Product #{$idProduct} -> categories " . implode(',', array_keys($newRows)) . " (default {$def})\n";
    }
}

// Deactivate demo categories deepest first (avoid hook/context issues in CLI).
$rows = Db::getInstance()->executeS(
    'SELECT c.`id_category`, c.`level_depth` FROM `' . _DB_PREFIX_ . 'category` c
     WHERE c.`id_category` IN (' . $demoIdList . ')
     ORDER BY c.`level_depth` DESC'
);

if ($rows) {
    foreach ($rows as $r) {
        $idCat = (int) $r['id_category'];
        if ($idCat === $idHome) {
            continue;
        }
        if (Db::getInstance()->update('category', ['active' => 0], '`id_category` = ' . $idCat)) {
            echo "Deactivated category #{$idCat}\n";
        }
    }
}

Tools::clearSmartyCache();

if (class_exists('Search', false)) {
    Search::indexation(false);
}

echo "Demo categories disabled. Clear prod cache as www-data if needed: php bin/console cache:clear --env=prod -n\n";

function categoryIdByRewrite(string $rewrite, int $idLang): int
{
    $sql = new DbQuery();
    $sql->select('c.`id_category`');
    $sql->from('category', 'c');
    $sql->innerJoin('category_lang', 'cl', 'c.`id_category` = cl.`id_category`');
    $sql->where('cl.`link_rewrite` = \'' . pSQL($rewrite) . '\'');
    $sql->where('cl.`id_lang` = ' . (int) $idLang);

    return (int) Db::getInstance()->getValue($sql);
}
