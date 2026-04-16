# PrestaShop 8.1 with installer fix for fresh installs without parameters.php
# (Cookie used to call Configuration before _DB_PREFIX_ exists — see patch-install-init.php).
FROM prestashop/prestashop:8.1

COPY patch-install-init.php /tmp/patch-install-init.php
RUN php /tmp/patch-install-init.php && rm -f /tmp/patch-install-init.php
