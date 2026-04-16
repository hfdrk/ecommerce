<?php
/**
 * Pulls the same public images as https://ardensprint.com/ into PrestaShop:
 * - ps_imageslider: 4 hero slides (hero-1..4.png)
 * - Demo catalog SKUs: cover = live product/DTF artwork (see ardensprint_media.php)
 *
 * Safe to re-run: re-downloads files and replaces product cover images for mapped SKUs.
 *
 *   docker cp seed/ardensprint_sync_demo_assets.php arden_ps_shop:/var/www/html/seed/
 *   docker cp seed/ardensprint_media.php arden_ps_shop:/var/www/html/seed/
 *   docker exec -u www-data arden_ps_shop php /var/www/html/seed/ardensprint_sync_demo_assets.php
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

Shop::setContext(Shop::CONTEXT_SHOP, $idShop);
$ctx = Context::getContext();
$ctx->shop = new Shop($idShop);
$ctx->language = new Language($idLang);

$media = require dirname(__FILE__) . '/ardensprint_media.php';

$sliderDir = _PS_MODULE_DIR_ . 'ps_imageslider/images/';
if (!is_dir($sliderDir) || !is_writable($sliderDir)) {
    fwrite(STDERR, "Slider image dir not writable: {$sliderDir}\n");
    exit(1);
}

/** @var array<int, array{file: string, title: string, legend: string}> $heroSlides */
$heroSlides = $media['hero_slides'];
$slideRows = Db::getInstance()->executeS(
    'SELECT `id_homeslider_slides` FROM `' . _DB_PREFIX_ . 'homeslider_slides` ORDER BY `position` ASC'
);
$slideIds = array_map(static function ($r) {
    return (int) $r['id_homeslider_slides'];
}, $slideRows ?: []);

foreach ($heroSlides as $i => $slide) {
    $fn = 'arden-slide-' . ($i + 1) . '-' . basename($slide['file']);
    $dest = $sliderDir . $fn;
    $url = $media['base'] . $slide['file'];
    if (!arden_fetch_to_file($url, $dest)) {
        fwrite(STDERR, "Failed to download slider: {$url}\n");
        continue;
    }
    @chmod($dest, 0644);
    echo "Slider asset: {$fn}\n";

    $idSlide = isset($slideIds[$i]) ? $slideIds[$i] : 0;
    if ($idSlide < 1) {
        Db::getInstance()->insert('homeslider_slides', ['position' => $i + 1, 'active' => 1]);
        $idSlide = (int) Db::getInstance()->Insert_ID();
        Db::getInstance()->insert('homeslider_slides_lang', [
            'id_homeslider_slides' => $idSlide,
            'id_lang' => $idLang,
            'title' => $slide['title'],
            'description' => '<p></p>',
            'legend' => $slide['legend'],
            'url' => '/',
            'image' => $fn,
        ]);
        echo "Inserted homeslider slide {$idSlide}\n";
        continue;
    }
    Db::getInstance()->update(
        'homeslider_slides',
        ['position' => $i + 1, 'active' => 1],
        '`id_homeslider_slides` = ' . (int) $idSlide
    );
    Db::getInstance()->update(
        'homeslider_slides_lang',
        [
            'title' => $slide['title'],
            'legend' => $slide['legend'],
            'url' => '/',
            'image' => $fn,
        ],
        '`id_homeslider_slides` = ' . (int) $idSlide . ' AND `id_lang` = ' . (int) $idLang
    );
    echo "Updated homeslider slide {$idSlide}\n";
}

$coverBySku = [
    'BB-4700' => $media['products'][0],
    'AA-1304' => $media['products'][1],
    'DTF-GS-1216' => $media['dtf_transfer_by_size'],
    'DTF-RL-10' => $media['dtf_ready'],
    'AC-TOTE-12' => $media['products'][4],
    'SRV-RUSH' => $media['dtf_gang_builder'],
    'QZ-PERF-01' => $media['products'][2],
    'FL-HD-PR' => $media['products'][3],
];

$demoMetaBySku = [
    'BB-4700' => ['name' => '47 Brand 4700', 'price' => 7.5],
    'AA-1304' => ['name' => 'American Apparel 1304', 'price' => 8.81],
    'DTF-GS-1216' => ['name' => 'DTF Gang Sheet — 12×16', 'price' => 18.0],
    'DTF-RL-10' => ['name' => 'DTF Ready Roll — 10 yd', 'price' => 129.0],
    'AC-TOTE-12' => ['name' => 'Canvas Tote — 12 oz', 'price' => 14.25],
    'SRV-RUSH' => ['name' => 'Rush POD Fulfillment', 'price' => 2.5],
    'QZ-PERF-01' => ['name' => 'Quarter-Zip — Performance', 'price' => 36.0],
    'FL-HD-PR' => ['name' => 'Fleece Hood — Premium', 'price' => 42.0],
];

foreach ($coverBySku as $sku => $imageUrl) {
    $idProduct = (int) Db::getInstance()->getValue(
        'SELECT `id_product` FROM `' . _DB_PREFIX_ . 'product` WHERE `reference` = \'' . pSQL($sku) . '\''
    );
    if ($idProduct < 1) {
        echo "Skip (no product): {$sku}\n";
        continue;
    }
    if (isset($demoMetaBySku[$sku])) {
        $pr = new Product($idProduct);
        if (Validate::isLoadedObject($pr)) {
            $pr->price = $demoMetaBySku[$sku]['price'];
            foreach (Language::getLanguages(true) as $lang) {
                $lid = (int) $lang['id_lang'];
                $pr->name[$lid] = $demoMetaBySku[$sku]['name'];
            }
            $pr->update();
            echo "Updated product text/price: {$sku}\n";
        }
    }
    if (arden_replace_product_cover($idProduct, $imageUrl, $idLang, $idShop)) {
        echo "Cover OK: {$sku}\n";
    } else {
        fwrite(STDERR, "Cover failed: {$sku}\n");
    }
}

if (class_exists('Search', false)) {
    Search::indexation(false);
}
if (is_file(_PS_ROOT_DIR_ . '/bin/console')) {
    passthru('php ' . escapeshellarg(_PS_ROOT_DIR_ . '/bin/console') . ' cache:clear --env=prod --no-warmup -n 2>/dev/null', $code);
}

echo "Ardensprint demo asset sync done.\n";

function arden_fetch_to_file(string $url, string $dest): bool
{
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 45,
            'header' => "User-Agent: ArdenPrestaShopSeed/1\r\nAccept: image/*,*/*\r\n",
        ],
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
        ],
    ]);
    $data = @file_get_contents($url, false, $ctx);
    if ($data === false || $data === '') {
        return false;
    }

    return file_put_contents($dest, $data) !== false;
}

function arden_replace_product_cover(int $idProduct, string $imageUrl, int $idLang, int $idShop): bool
{
    $rows = Image::getImages($idLang, $idProduct);
    foreach ($rows as $row) {
        $img = new Image((int) $row['id_image']);
        if (Validate::isLoadedObject($img)) {
            $img->delete();
        }
    }
    $image = new Image();
    $image->id_product = $idProduct;
    $image->cover = true;
    if (!$image->add()) {
        return false;
    }
    $ok = ImageManager::copyImg($idProduct, (int) $image->id, $imageUrl, 'products', true);
    if (!$ok) {
        $image->delete();

        return false;
    }

    return true;
}
