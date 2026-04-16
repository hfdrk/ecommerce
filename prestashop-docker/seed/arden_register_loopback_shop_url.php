<?php
/**
 * PrestaShop only trusts hosts listed in ps_shop_url. If the shop was installed as
 * localhost:8081 but you open http://127.0.0.1:8081/, every link 302-redirects to /
 * (looks like "one page" / navigation broken). This adds 127.0.0.1:8081 as an alternate URL.
 *
 * Idempotent. Run inside container as www-data:
 *   php /var/www/html/seed/arden_register_loopback_shop_url.php
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
$aliases = [
    ['127.0.0.1:8081', '127.0.0.1:8081'],
];

foreach ($aliases as [$domain, $domainSsl]) {
    $exists = (int) Db::getInstance()->getValue(
        'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'shop_url` WHERE `domain` = \'' . pSQL($domain) . '\''
    );
    if ($exists > 0) {
        echo "Shop URL already present: {$domain}\n";
        continue;
    }
    Db::getInstance()->insert('shop_url', [
        'id_shop' => $idShop,
        'domain' => $domain,
        'domain_ssl' => $domainSsl,
        'physical_uri' => '/',
        'virtual_uri' => '',
        'main' => 0,
        'active' => 1,
    ]);
    echo "Registered alternate shop URL: {$domain}\n";
}

if (is_file(_PS_ROOT_DIR_ . '/bin/console')) {
    passthru('php ' . escapeshellarg(_PS_ROOT_DIR_ . '/bin/console') . ' cache:clear --env=prod --no-warmup -n 2>/dev/null', $code);
}

echo "Done.\n";
