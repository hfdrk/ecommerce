# Deploy Arden child theme + ardenhomelinks module into the PrestaShop container.
param(
    [string]$ContainerName = "arden_ps_shop"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# Replace theme folder entirely so partial copies cannot leave a nested themes/arden/arden/ tree.
docker exec $ContainerName rm -rf /var/www/html/themes/arden
docker cp "$root/theme/arden" "${ContainerName}:/var/www/html/themes/arden"
docker cp "$root/modules/ardenhomelinks" "${ContainerName}:/var/www/html/modules/ardenhomelinks"

docker exec $ContainerName sh -c "cp /var/www/html/themes/classic/preview.png /var/www/html/themes/arden/preview.png 2>/dev/null"
docker exec $ContainerName chown -R www-data:www-data /var/www/html/themes/arden /var/www/html/modules/ardenhomelinks
# Theme enable writes config/themes/arden/shop*.json — must be writable by www-data.
docker exec $ContainerName sh -c "mkdir -p /var/www/html/config/themes/arden && chown -R www-data:www-data /var/www/html/config/themes"

docker exec -u www-data $ContainerName sh -c "php /var/www/html/bin/console prestashop:module install ardenhomelinks -n || php /var/www/html/bin/console prestashop:module upgrade ardenhomelinks -n"
docker exec -u www-data $ContainerName php /var/www/html/bin/console prestashop:theme:enable arden -n
docker exec $ContainerName sh -c "rm -rf /var/www/html/var/cache/prod/smarty /var/www/html/var/cache/dev/smarty 2>/dev/null; chown -R www-data:www-data /var/www/html/var"
# Console must run as www-data so new cache files are writable by PHP-FPM (avoids 500 after warmup).
docker exec -u www-data $ContainerName php /var/www/html/bin/console cache:clear --env=prod -n
docker exec -u www-data $ContainerName php /var/www/html/bin/console cache:warmup --env=prod -n

Write-Host "Done. Open http://localhost:8081/ (adjust port if PRESTASHOP_PORT differs)."
