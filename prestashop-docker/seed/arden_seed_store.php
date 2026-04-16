<?php
/**
 * Seeds Arden's Print content into an installed PrestaShop (8.1+):
 * - Shop name & email
 * - CMS pages: About, Privacy, Terms, Returns (English)
 * - Home "featured products" block: category + count (after catalog CSV import)
 *
 * Copy into the container and run from /var/www/html:
 *   docker cp seed/arden_seed_store.php arden_ps_shop:/var/www/html/seed/arden_seed_store.php
 *   docker exec arden_ps_shop php /var/www/html/seed/arden_seed_store.php
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
$context = Context::getContext();
$context->shop = new Shop($idShop);
$context->language = new Language($idLang);

Configuration::updateValue('PS_SHOP_NAME', "Arden's Print");
Configuration::updateValue('PS_SHOP_EMAIL', 'info@ardensprint.com');

$pages = [
    'about' => [
        'title' => 'About',
        'meta' => "Arden's Print — DTF, blanks, and POD fulfillment built for serious decorators.",
        'html' => <<<'HTML'
<div class="arden-cms">
<p class="lead"><strong>Built for shops that live on deadline.</strong></p>
<p>Arden's Print focuses on predictable color, stable blank specs, and fulfillment you can quote with confidence. Whether you are heat-pressing DTF in-house or routing POD to your customers, the goal is the same: fewer surprises on the receiving dock.</p>
<p>From Tomball, TX, we support decorators across the country with fast turnarounds and clear communication — so you can spend less time chasing status and more time selling.</p>
</div>
HTML
    ],
    'privacy-policy' => [
        'title' => 'Privacy',
        'meta' => 'Privacy policy — Arden\'s Print demo storefront.',
        'html' => '<div class="arden-cms"><p>This is a placeholder privacy policy for the demo storefront. Replace with your legal copy and data handling details before production.</p></div>',
    ],
    'terms-conditions' => [
        'title' => 'Terms & conditions',
        'meta' => 'Terms and conditions — Arden\'s Print demo storefront.',
        'html' => '<div class="arden-cms"><p>Placeholder terms for the demo. Add your payment terms, lead times, and liability limits for live use.</p></div>',
    ],
    'returns-policy' => [
        'title' => 'Returns',
        'meta' => 'Returns policy — Arden\'s Print demo storefront.',
        'html' => '<div class="arden-cms"><p>Placeholder returns policy. Custom decorated goods usually require tailored language — replace with your operational policy.</p></div>',
    ],
];

foreach ($pages as $rewrite => $data) {
    upsertCmsPage($rewrite, $data['title'], $data['html'], $data['meta'], $idLang, $idShop);
}

$idDtf = (int) Db::getInstance()->getValue(
    'SELECT c.`id_category` FROM `' . _DB_PREFIX_ . 'category_lang` cl
    INNER JOIN `' . _DB_PREFIX_ . 'category` c ON c.`id_category` = cl.`id_category`
    WHERE cl.`link_rewrite` = \'dtf-transfers\' AND cl.`id_lang` = ' . (int) $idLang
);
if ($idDtf > 0) {
    Configuration::updateValue('HOME_FEATURED_CAT', $idDtf);
    Configuration::updateValue('HOME_FEATURED_NBR', 8);
}

if (class_exists('Tools')) {
    Tools::clearSmartyCache();
    Tools::clearXMLCache();
}

$root = _PS_ROOT_DIR_;
if (is_file($root . '/bin/console')) {
    passthru('php ' . escapeshellarg($root . '/bin/console') . ' cache:clear --env=prod --no-warmup 2>/dev/null', $code);
}

echo "Arden seed completed.\n";

/**
 * @param mixed $idShop
 */
function upsertCmsPage(string $linkRewrite, string $title, string $html, string $metaDescription, int $idLang, $idShop): void
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
    $cms->meta_keywords[$idLang] = 'arden, print, dtf';
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
