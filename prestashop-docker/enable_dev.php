<?php
$f = '/var/www/html/config/defines.inc.php';
$c = file_get_contents($f);
$c = str_replace("'_PS_MODE_DEV_', true", "'_PS_MODE_DEV_', false", $c);
file_put_contents($f, $c);
echo "Dev mode disabled\n";
