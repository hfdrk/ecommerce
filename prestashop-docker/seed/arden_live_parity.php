<?php
/**
 * Expands catalog + CMS toward https://ardensprint.com/ structure (categories, DTF tools, design pages).
 * Run inside container as www-data:
 *   php /var/www/html/seed/arden_live_parity.php
 *
 * Idempotent: categories/CMS matched by link_rewrite; placeholder SKUs prefixed LIVE-.
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

use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductType;

$idShop = (int) Configuration::get('PS_SHOP_DEFAULT');
$idLang = (int) Configuration::get('PS_LANG_DEFAULT');
$idHome = (int) Configuration::get('PS_HOME_CATEGORY');
$taxRulesId = 9;

Shop::setContext(Shop::CONTEXT_SHOP, $idShop);
$ctx = Context::getContext();
$ctx->shop = new Shop($idShop);
$ctx->language = new Language($idLang);

$idDtf = findCategoryIdByRewrite('dtf-transfers', $idLang);
if ($idDtf) {
    $dtfSubs = [
        'DTF Transfer By Size' => 'dtf-transfer-by-size',
        'DTF Gangsheet Builder' => 'dtf-gangsheet-builder',
        'DTF Transfer - Upload Gang Sheet' => 'dtf-upload-gang-sheet',
    ];
    foreach ($dtfSubs as $name => $rw) {
        $id = getOrCreateCategory($name, $rw, $idDtf, '<p>' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ' — see <a href="https://ardensprint.com/">ardensprint.com</a> for live tools.</p>', $idLang, $idShop);
        echo $id ? "DTF sub: {$name} ({$id})\n" : '';
        ensurePlaceholderProduct($name, 'LIVE-DTF' . substr(md5($rw), 0, 10), 0.01, $id, $idLang, $idShop, $taxRulesId);
    }
}

$idBlanksRoot = getOrCreateCategory(
    'Blanks',
    'blanks-catalog',
    $idHome,
    '<p>Blank apparel categories aligned with <a href="https://ardensprint.com/">ardensprint.com</a>.</p>',
    $idLang,
    $idShop
);
if ($idBlanksRoot) {
    echo "Blanks root: {$idBlanksRoot}\n";
}

$blanksLeaves = [
    'Headwear' => 'headwear',
    'Bottoms' => 'bottoms',
    'T-Shirts - Premium' => 't-shirts-premium',
    'Quarter-Zips' => 'quarter-zips',
    'Fleece - Premium - Hood' => 'fleece-premium-hood',
    'Sport Shirts' => 'sport-shirts',
    'Outerwear' => 'outerwear',
    'T-Shirts - Long Sleeve' => 't-shirts-long-sleeve',
    'Fleece - Premium - Crew' => 'fleece-premium-crew',
    'Wovens' => 'wovens',
    'Athletics' => 'athletics',
    'T-Shirts - Core' => 't-shirts-core',
    'Workwear' => 'workwear',
    'Bags' => 'bags',
    'Fleece - Core - Hood' => 'fleece-core-hood',
    'Medical' => 'medical',
    'Accessories' => 'blank-accessories',
];

if ($idBlanksRoot) {
    foreach ($blanksLeaves as $name => $rw) {
        $id = getOrCreateCategory($name, $rw, $idBlanksRoot, '<p>' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ' — inventory mirrors our live catalog.</p>', $idLang, $idShop);
        $sku = 'LIVE-' . strtoupper(str_replace('-', '', $rw));
        if (strlen($sku) > 32) {
            $sku = 'LIVE-' . substr(md5($rw), 0, 10);
        }
        ensurePlaceholderProduct($name, $sku, 0.01, (int) $id, $idLang, $idShop, $taxRulesId);
    }
}

$cmsPages = [
    'design-studio' => [
        'title' => 'Design Studio',
        'meta' => 'Design & preview custom gear online — Arden\'s Print.',
        'html' => <<<'HTML'
<div class="arden-cms"><p><strong>No designer? No problem.</strong></p>
<p>Our live store includes a Design Studio flow: upload artwork, preview on mockups, and place your order. Visit <a href="https://ardensprint.com/">ardensprint.com</a> for the full interactive experience.</p>
<ul>
<li>Upload your artwork, logo, or pick from a design library</li>
<li>Preview on tees, hoodies, totes, and more</li>
<li>Great for schools, fundraisers, businesses, and events</li>
</ul>
</div>
HTML
    ],
    'design-library' => [
        'title' => 'Design Library',
        'meta' => 'Graphics categories for custom gear — Arden\'s Print.',
        'html' => '<div class="arden-cms"><p>Browse graphics by category for your custom gear. The full library is available on <a href="https://ardensprint.com/">ardensprint.com</a>.</p></div>',
    ],
    'membership' => [
        'title' => 'Membership',
        'meta' => 'Knight of Savings tiers — Arden\'s Print.',
        'html' => <<<'HTML'
<div class="arden-cms"><h3>Become a Knight of Savings</h3>
<p>Membership tiers (see live site for current pricing):</p>
<ul>
<li><strong>Warrior</strong> — $14.99/mo</li>
<li><strong>Elite</strong> — $39.99/mo</li>
<li><strong>Royal</strong> — $89.99/mo</li>
</ul>
<p>Subscribe and manage your plan on <a href="https://ardensprint.com/">ardensprint.com</a>.</p>
</div>
HTML
    ],
];

foreach ($cmsPages as $rw => $data) {
    upsertCms($rw, $data['title'], $data['html'], $data['meta'], $idLang, $idShop);
    echo "CMS: {$rw}\n";
}

if (class_exists('Search', false)) {
    Search::indexation(false);
}
if (is_file(_PS_ROOT_DIR_ . '/bin/console')) {
    passthru('php ' . escapeshellarg(_PS_ROOT_DIR_ . '/bin/console') . ' cache:clear --env=prod --no-warmup -n 2>/dev/null', $code);
}

echo "Arden live parity seed completed.\n";

function findCategoryIdByRewrite(string $rewrite, int $idLang): int
{
    $sql = new DbQuery();
    $sql->select('c.`id_category`');
    $sql->from('category', 'c');
    $sql->innerJoin('category_lang', 'cl', 'c.`id_category` = cl.`id_category`');
    $sql->where('cl.`link_rewrite` = \'' . pSQL($rewrite) . '\'');
    $sql->where('cl.`id_lang` = ' . (int) $idLang);

    return (int) Db::getInstance()->getValue($sql);
}

function getOrCreateCategory(string $name, string $rewrite, int $idParent, string $descHtml, int $idLang, int $idShop): int
{
    $existing = findCategoryIdByRewrite($rewrite, $idLang);
    if ($existing) {
        return $existing;
    }
    $c = new Category();
    $c->active = 1;
    $c->id_parent = $idParent;
    $c->id_shop_default = $idShop;
    foreach (Language::getLanguages(true) as $lang) {
        $lid = (int) $lang['id_lang'];
        $c->name[$lid] = $name;
        $c->link_rewrite[$lid] = $rewrite;
        $c->description[$lid] = $descHtml;
        $c->meta_title[$lid] = $name . " · Arden's Print";
        $c->meta_description[$lid] = strip_tags($descHtml);
    }
    if (!$c->add()) {
        return 0;
    }
    $c->associateTo([$idShop]);

    return (int) $c->id;
}

function ensurePlaceholderProduct(string $name, string $sku, float $price, int $idCategory, int $idLang, int $idShop, int $taxRulesId): void
{
    $ref = pSQL($sku);
    $exists = (int) Db::getInstance()->getValue(
        'SELECT `id_product` FROM `' . _DB_PREFIX_ . 'product` WHERE `reference` = \'' . $ref . '\''
    );
    if ($exists) {
        return;
    }
    $product = new Product();
    $product->active = 1;
    $product->visibility = 'both';
    $product->available_for_order = 1;
    $product->show_price = 1;
    $product->indexed = 1;
    $product->minimal_quantity = 1;
    $product->id_tax_rules_group = $taxRulesId;
    $product->id_category_default = $idCategory;
    $product->id_shop_default = $idShop;
    $product->reference = $sku;
    $product->price = $price;
    $product->product_type = ProductType::TYPE_STANDARD;
    $html = '<p>Category showcase — for full live inventory and variants visit <a href="https://ardensprint.com/">ardensprint.com</a>.</p>';
    foreach (Language::getLanguages(true) as $lang) {
        $lid = (int) $lang['id_lang'];
        $product->name[$lid] = $name . ' (catalog)';
        $product->link_rewrite[$lid] = Tools::str2url($sku . '-' . $name);
        $product->description_short[$lid] = $html;
        $product->description[$lid] = $html;
        $product->meta_title[$lid] = $name . " · Arden's Print";
        $product->meta_description[$lid] = 'See ardensprint.com for live pricing and stock.';
    }
    if (!$product->add()) {
        return;
    }
    $product->addToCategories([$idCategory]);
    $product->associateTo([$idShop]);
    StockAvailable::setQuantity((int) $product->id, 0, 999, $idShop);
}

function upsertCms(string $linkRewrite, string $title, string $html, string $metaDescription, int $idLang, int $idShop): void
{
    $id = (int) Db::getInstance()->getValue(
        'SELECT l.`id_cms` FROM `' . _DB_PREFIX_ . 'cms_lang` l
         INNER JOIN `' . _DB_PREFIX_ . 'cms` c ON c.`id_cms` = l.`id_cms`
         WHERE l.`link_rewrite` = \'' . pSQL($linkRewrite) . '\'
           AND l.`id_lang` = ' . (int) $idLang . '
           AND l.`id_shop` = ' . (int) $idShop
    );

    $cms = $id ? new CMS($id) : new CMS();
    $cms->id_cms_category = 1;
    $cms->active = 1;
    $cms->indexation = 1;

    $cms->meta_title = [];
    $cms->head_seo_title = [];
    $cms->meta_description = [];
    $cms->meta_keywords = [];
    $cms->content = [];
    $cms->link_rewrite = [];

    $cms->meta_title[$idLang] = $title;
    $cms->head_seo_title[$idLang] = $title;
    $cms->meta_description[$idLang] = $metaDescription;
    $cms->meta_keywords[$idLang] = 'arden, ardensprint, print';
    $cms->content[$idLang] = $html;
    $cms->link_rewrite[$idLang] = $linkRewrite;

    if ($id) {
        $cms->update();
    } else {
        $cms->add();
        if (!empty($cms->id)) {
            $cms->associateTo([$idShop]);
        }
    }
}
