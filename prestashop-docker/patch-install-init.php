<?php
/**
 * Run inside PrestaShop container once:
 *   php /path/to/patch-install-init.php
 *
 * Fixes PS 8.1+ installer: Cookie::__construct reads Configuration before
 * _DB_PREFIX_ exists when app/config/parameters.php is missing.
 */
$p = '/var/www/html/install/init.php';
$t = file_get_contents($p);
$needle = "require_once _PS_CORE_DIR_ . '/config/defines.inc.php';";
$insert = <<<'PHP'
// Fresh install: avoid Configuration::load before DB/bootstrap (Cookie reads PS_COOKIE_SAMESITE).
if (!file_exists(_PS_CORE_DIR_ . '/app/config/parameters.php')) {
    if (!defined('_PS_DO_NOT_LOAD_CONFIGURATION_')) {
        define('_PS_DO_NOT_LOAD_CONFIGURATION_', true);
    }
}

require_once _PS_CORE_DIR_ . '/config/defines.inc.php';
PHP;

if (strpos($t, 'Fresh install: avoid Configuration') !== false) {
    fwrite(STDERR, "Already patched.\n");
    exit(0);
}
$pos = strpos($t, $needle);
if ($pos === false) {
    fwrite(STDERR, "Expected line not found in init.php.\n");
    exit(1);
}
$t = substr_replace($t, $insert, $pos, strlen($needle));
file_put_contents($p, $t);
echo "Patched: $p\n";
