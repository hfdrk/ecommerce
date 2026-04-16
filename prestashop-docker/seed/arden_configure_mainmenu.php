<?php
/**
 * Replaces default demo main menu (Clothes, Accessories, Art) with Arden-style items
 * aligned with https://ardensprint.com/ — DTF, Blanks, Custom print (print-services), Shop, About, Contact.
 *
 * Run inside the shop container as www-data:
 *   php /var/www/html/seed/arden_configure_mainmenu.php
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

if (!class_exists('Ps_MenuTopLinks', false)) {
    require_once _PS_MODULE_DIR_ . 'ps_mainmenu/ps_menutoplinks.class.php';
}

$idShop = (int) Configuration::get('PS_SHOP_DEFAULT');
$idLangDefault = (int) Configuration::get('PS_LANG_DEFAULT');

Shop::setContext(Shop::CONTEXT_SHOP, $idShop);
$ctx = Context::getContext();
$ctx->shop = new Shop($idShop);
$ctx->language = new Language($idLangDefault);
$link = $ctx->link;

if (!$link) {
    fwrite(STDERR, "Context link missing.\n");
    exit(1);
}

$idDtf = (int) categoryIdByRewrite('dtf-transfers', $idLangDefault);
$idBlanks = (int) categoryIdByRewrite('blanks-catalog', $idLangDefault);
$idAbout = (int) cmsIdByRewrite('about-us', $idLangDefault, $idShop);
if (!$idAbout) {
    $idAbout = (int) cmsIdByRewrite('about', $idLangDefault, $idShop);
}

$idPsvc = (int) categoryIdByRewrite('print-services', $idLangDefault);

if (!$idDtf || !$idBlanks) {
    fwrite(STDERR, "Run arden_live_parity.php first (missing dtf-transfers or blanks-catalog).\n");
    exit(1);
}
if (!$idAbout) {
    fwrite(STDERR, "Missing CMS page about-us or about (run arden_seed_store.php).\n");
    exit(1);
}
if (!$idPsvc) {
    fwrite(STDERR, "Missing category print-services (run catalog import / arden_categories.csv).\n");
    exit(1);
}

$languages = Language::getLanguages(true, $idShop);
if (!$languages) {
    fwrite(STDERR, "No languages.\n");
    exit(1);
}

$labelShop = [];
$linkShop = [];
$labelContact = [];
$linkContact = [];
foreach ($languages as $lang) {
    $lid = (int) $lang['id_lang'];
    $labelShop[$lid] = 'Shop';
    $labelContact[$lid] = 'Contact';
    $linkShop[$lid] = $link->getPageLink('new-products');
    $linkContact[$lid] = $link->getPageLink('contact');
}

$idLnkShop = ensureCustomTopLink($idShop, 'Shop', $labelShop, $linkShop);
$idLnkContact = ensureCustomTopLink($idShop, 'Contact', $labelContact, $linkContact);

if (!$idLnkShop || !$idLnkContact) {
    fwrite(STDERR, "Failed to create or update custom menu links.\n");
    exit(1);
}

$items = [
    'CAT' . $idDtf,
    'CAT' . $idBlanks,
    'CAT' . $idPsvc,
    'LNK' . $idLnkShop,
    'CMS' . $idAbout,
    'LNK' . $idLnkContact,
];

$serialized = implode(',', $items);
Configuration::updateValue('MOD_BLOCKTOPMENU_ITEMS', $serialized, false, null, $idShop);

echo "MOD_BLOCKTOPMENU_ITEMS = {$serialized}\n";

Tools::clearSmartyCache();

// Do not run bin/console cache:clear here: when CLI runs as root it can break prod (www-data cannot write var/cache).
// After this script: docker exec -u www-data <container> php bin/console cache:clear --env=prod -n

echo "Arden main menu configuration completed.\n";

/**
 * @param array<int, string> $labelsByLang
 * @param array<int, string> $urlsByLang
 */
function ensureCustomTopLink(int $idShop, string $labelMatch, array $labelsByLang, array $urlsByLang): int
{
    $sql = new DbQuery();
    $sql->select('l.`id_linksmenutop`');
    $sql->from('linksmenutop', 'l');
    $sql->innerJoin('linksmenutop_lang', 'll', 'l.`id_linksmenutop` = ll.`id_linksmenutop`');
    $sql->where('ll.`id_shop` = ' . (int) $idShop);
    $sql->where('ll.`label` = \'' . pSQL($labelMatch) . '\'');
    $existing = (int) Db::getInstance()->getValue($sql);

    if ($existing) {
        foreach ($labelsByLang as $idLang => $label) {
            Db::getInstance()->update(
                'linksmenutop_lang',
                [
                    'label' => pSQL($label),
                    'link' => pSQL($urlsByLang[$idLang] ?? ''),
                ],
                '`id_linksmenutop` = ' . (int) $existing . ' AND `id_lang` = ' . (int) $idLang . ' AND `id_shop` = ' . (int) $idShop
            );
        }

        return $existing;
    }

    $ok = Ps_MenuTopLinks::add($urlsByLang, $labelsByLang, 0, $idShop);
    if (!$ok) {
        return 0;
    }

    return (int) Db::getInstance()->Insert_ID();
}

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

function cmsIdByRewrite(string $rewrite, int $idLang, int $idShop): int
{
    return (int) Db::getInstance()->getValue(
        'SELECT l.`id_cms` FROM `' . _DB_PREFIX_ . 'cms_lang` l
         WHERE l.`link_rewrite` = \'' . pSQL($rewrite) . '\'
           AND l.`id_lang` = ' . (int) $idLang . '
           AND l.`id_shop` = ' . (int) $idShop
    );
}
