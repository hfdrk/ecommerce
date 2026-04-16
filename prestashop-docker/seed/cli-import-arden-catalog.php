<?php
/**
 * CLI: import Arden demo categories + products (matches generate-catalog-csv.php data).
 * Product images + prices align with public https://ardensprint.com/ demo (see ardensprint_media.php).
 * Run inside the shop container:
 *   php /var/www/html/seed/cli-import-arden-catalog.php
 *
 * Idempotent: skips categories/products that already exist (by link_rewrite / reference).
 * Re-sync covers + slider: php /var/www/html/seed/ardensprint_sync_demo_assets.php
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

$media = require dirname(__FILE__) . '/ardensprint_media.php';

$categories = [
    ['name' => 'DTF Transfers', 'rewrite' => 'dtf-transfers', 'desc' => 'Full-color DTF film, gang sheets, and rolls for production decorators.'],
    ['name' => 'Blank Apparel', 'rewrite' => 'blank-apparel', 'desc' => 'Retail-ready blanks with consistent specs for repeat orders.'],
    ['name' => 'Accessories', 'rewrite' => 'accessories', 'desc' => 'Bags, add-ons, and finishing goods.'],
    ['name' => 'Print Services', 'rewrite' => 'print-services', 'desc' => 'Rush handling, fulfillment, and shop services.'],
];

$products = [
    ['slug' => '47-brand-4700', 'name' => '47 Brand 4700', 'price' => 7.5, 'category' => 'Blank Apparel', 'sku' => 'BB-4700', 'description' => 'Your next bestseller awaits — same style featured on ardensprint.com.', 'image_url' => $media['products'][0]],
    ['slug' => 'american-apparel-1304', 'name' => 'American Apparel 1304', 'price' => 8.81, 'category' => 'Blank Apparel', 'sku' => 'AA-1304', 'description' => 'Fine jersey with a smooth hand-feel — demo pricing matches live homepage.', 'image_url' => $media['products'][1]],
    ['slug' => 'dtf-gang-sheet-12x16', 'name' => 'DTF Gang Sheet — 12×16', 'price' => 18.0, 'category' => 'DTF Transfers', 'sku' => 'DTF-GS-1216', 'description' => 'Full-color DTF transfer sized for hats, pockets, and youth placements. Press-ready.', 'image_url' => $media['dtf_transfer_by_size']],
    ['slug' => 'dtf-ready-roll-10yd', 'name' => 'DTF Ready Roll — 10 yd', 'price' => 129.0, 'category' => 'DTF Transfers', 'sku' => 'DTF-RL-10', 'description' => 'Continuous roll for high-volume shops. Vibrant whites, predictable stretch.', 'image_url' => $media['dtf_ready']],
    ['slug' => 'canvas-tote-12oz', 'name' => 'Canvas Tote — 12 oz', 'price' => 14.25, 'category' => 'Accessories', 'sku' => 'AC-TOTE-12', 'description' => 'Heavy canvas with reinforced handles. Perfect for retail and event merch.', 'image_url' => $media['products'][4]],
    ['slug' => 'pod-rush-fulfillment', 'name' => 'Rush POD Fulfillment', 'price' => 2.5, 'category' => 'Print Services', 'sku' => 'SRV-RUSH', 'description' => 'Per-piece rush handling for tight deadlines. Pairs with any in-catalog garment.', 'image_url' => $media['dtf_gang_builder']],
    ['slug' => 'quarter-zip-performance', 'name' => 'Quarter-Zip — Performance', 'price' => 36.0, 'category' => 'Blank Apparel', 'sku' => 'QZ-PERF-01', 'description' => 'Moisture-wicking layer with clean zipper and minimal branding for relabeling.', 'image_url' => $media['products'][2]],
    ['slug' => 'fleece-hood-premium', 'name' => 'Fleece Hood — Premium', 'price' => 42.0, 'category' => 'Blank Apparel', 'sku' => 'FL-HD-PR', 'description' => 'Plush interior, stable shrinkage profile. Built for repeat heat applications.', 'image_url' => $media['products'][3]],
];

$catMap = []; // category name => id_category

foreach ($categories as $c) {
    $id = findCategoryIdByRewrite($c['rewrite'], $idLang, $idShop);
    if ($id) {
        echo "Category exists: {$c['name']} ({$id})\n";
        $catMap[$c['name']] = $id;
        continue;
    }
    $category = new Category();
    $category->active = 1;
    $category->id_parent = $idHome;
    $category->id_shop_default = $idShop;
    foreach (Language::getLanguages(true) as $lang) {
        $lid = (int) $lang['id_lang'];
        $category->name[$lid] = $c['name'];
        $category->link_rewrite[$lid] = $c['rewrite'];
        $category->description[$lid] = '<p>' . htmlspecialchars($c['desc'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</p>';
        $category->meta_title[$lid] = $c['name'] . " · Arden's Print";
        $category->meta_description[$lid] = $c['desc'];
    }
    if (!$category->add()) {
        fwrite(STDERR, "Failed to create category {$c['name']}\n");
        continue;
    }
    $category->associateTo([$idShop]);
    echo "Created category: {$c['name']} ({$category->id})\n";
    $catMap[$c['name']] = (int) $category->id;
}

foreach ($products as $p) {
    $ref = pSQL($p['sku']);
    $existing = (int) Db::getInstance()->getValue(
        'SELECT `id_product` FROM `' . _DB_PREFIX_ . 'product` WHERE `reference` = \'' . $ref . '\''
    );
    if ($existing) {
        echo "Product exists (skip): {$p['sku']}\n";
        continue;
    }
    if (!isset($catMap[$p['category']])) {
        fwrite(STDERR, "Missing category for {$p['name']}: {$p['category']}\n");
        continue;
    }
    $idCat = (int) $catMap[$p['category']];

    $product = new Product();
    $product->active = 1;
    $product->visibility = 'both';
    $product->available_for_order = 1;
    $product->show_price = 1;
    $product->indexed = 1;
    $product->minimal_quantity = 1;
    $product->id_tax_rules_group = $taxRulesId;
    $product->id_category_default = $idCat;
    $product->id_shop_default = $idShop;
    $product->reference = $p['sku'];
    $product->price = (float) $p['price'];
    $product->product_type = ProductType::TYPE_STANDARD;

    $html = '<p>' . htmlspecialchars($p['description'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</p>';
    foreach (Language::getLanguages(true) as $lang) {
        $lid = (int) $lang['id_lang'];
        $product->name[$lid] = $p['name'];
        $product->link_rewrite[$lid] = Tools::str2url($p['slug']);
        $product->description_short[$lid] = $html;
        $product->description[$lid] = $html;
        $product->meta_title[$lid] = $p['name'] . " · Arden's Print";
        $product->meta_description[$lid] = mb_substr($p['description'], 0, 160);
    }

    if (!$product->add()) {
        fwrite(STDERR, "Failed to add product {$p['sku']}\n");
        continue;
    }
    $product->addToCategories([$idCat]);
    $product->associateTo([$idShop]);

    StockAvailable::setQuantity((int) $product->id, 0, 100, $idShop);

    $img = new Image();
    $img->id_product = (int) $product->id;
    $img->cover = true;
    if ($img->add()) {
        $ok = ImageManager::copyImg((int) $product->id, (int) $img->id, $p['image_url'], 'products', true);
        echo $ok ? "Imported {$p['sku']} + image\n" : "Imported {$p['sku']} (image download failed)\n";
    } else {
        echo "Imported {$p['sku']} (no image row)\n";
    }
}

$idDtfFeatured = findCategoryIdByRewrite('dtf-transfers', $idLang, $idShop);
if ($idDtfFeatured > 0) {
    Configuration::updateValue('HOME_FEATURED_CAT', $idDtfFeatured);
    Configuration::updateValue('HOME_FEATURED_NBR', 8);
    echo "HOME_FEATURED_CAT -> DTF Transfers (id {$idDtfFeatured})\n";
}

if (class_exists('Search', false)) {
    Search::indexation(false);
}

if (is_file(_PS_ROOT_DIR_ . '/bin/console')) {
    passthru('php ' . escapeshellarg(_PS_ROOT_DIR_ . '/bin/console') . ' cache:clear --env=prod --no-warmup -n 2>/dev/null', $code);
}

echo "Done.\n";

function findCategoryIdByRewrite(string $rewrite, int $idLang, int $idShop): int
{
    $sql = new DbQuery();
    $sql->select('c.`id_category`');
    $sql->from('category', 'c');
    $sql->innerJoin('category_lang', 'cl', 'c.`id_category` = cl.`id_category`');
    $sql->where('cl.`link_rewrite` = \'' . pSQL($rewrite) . '\'');
    $sql->where('cl.`id_lang` = ' . (int) $idLang);

    return (int) Db::getInstance()->getValue($sql);
}
