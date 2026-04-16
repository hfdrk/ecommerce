# One-shot: import Arden catalog (CLI), seed CMS + shop settings, deploy theme + ardenhomelinks.
param(
    [string]$ContainerName = "arden_ps_shop"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "==> Copying seed scripts..."
docker exec $ContainerName mkdir -p /var/www/html/seed
docker cp "$root/seed/cli-import-arden-catalog.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/arden_live_parity.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/arden_configure_mainmenu.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/arden_disable_demo_categories.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/arden_seed_store.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/ardensprint_media.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/ardensprint_sync_demo_assets.php" "${ContainerName}:/var/www/html/seed/"
docker cp "$root/seed/arden_register_loopback_shop_url.php" "${ContainerName}:/var/www/html/seed/"
docker exec $ContainerName chown www-data:www-data /var/www/html/seed/cli-import-arden-catalog.php /var/www/html/seed/arden_live_parity.php /var/www/html/seed/arden_configure_mainmenu.php /var/www/html/seed/arden_disable_demo_categories.php /var/www/html/seed/arden_seed_store.php /var/www/html/seed/ardensprint_media.php /var/www/html/seed/ardensprint_sync_demo_assets.php /var/www/html/seed/arden_register_loopback_shop_url.php

Write-Host "==> Register 127.0.0.1:8081 as alternate shop URL (fixes nav when not using localhost hostname)..."
docker exec -u www-data $ContainerName php /var/www/html/seed/arden_register_loopback_shop_url.php

Write-Host "==> Importing categories & products..."
docker exec -u www-data $ContainerName php /var/www/html/seed/cli-import-arden-catalog.php

Write-Host "==> Expanding live parity (blanks catalog, DTF tools, CMS, placeholders)..."
docker exec -u www-data $ContainerName php /var/www/html/seed/arden_live_parity.php

Write-Host "==> Main menu (DTF, Blanks, Shop, About, Contact — no demo Clothes/Accessories/Art)..."
docker exec -u www-data $ContainerName php /var/www/html/seed/arden_configure_mainmenu.php

Write-Host "==> Disable demo categories (Clothes, Men, Women, …) — move products to Arden categories..."
docker exec -u www-data $ContainerName php /var/www/html/seed/arden_disable_demo_categories.php

Write-Host "==> Seeding CMS + shop name + featured category..."
docker exec -u www-data $ContainerName php /var/www/html/seed/arden_seed_store.php

Write-Host "==> Sync ardensprint.com hero slider + product images (live asset URLs)..."
docker exec -u www-data $ContainerName php /var/www/html/seed/ardensprint_sync_demo_assets.php

Write-Host "==> Theme + module..."
& "$root/install-arden-frontend.ps1" -ContainerName $ContainerName

Write-Host "Full Arden deploy finished. Storefront: http://localhost:8081/"
