# Apply PrestaShop installer fix to a running container (existing ps_www volume).
# Not needed if you use the image built from this folder's Dockerfile.
param(
    [string]$ContainerName = "arden_ps_shop"
)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$patch = Join-Path $here "patch-install-init.php"

if (-not (Test-Path $patch)) {
    Write-Error "Missing $patch"
}

docker cp $patch "${ContainerName}:/tmp/patch-install-init.php"
docker exec $ContainerName php /tmp/patch-install-init.php
