Arden Print — child theme of Classic
====================================

What it does
------------
- Loads assets/css/arden.css (brand colors/fonts aligned with the Next.js demo).
- Overrides templates/index.tpl to inject a hero + category pillars above the usual
  home hooks (slider, featured products, etc.).
- Works together with the module ../modules/ardenhomelinks (category URLs by link_rewrite).

Required theme.yml keys (PrestaShop 8 validator)
-------------------------------------------------
- meta.available_layouts (copy from Classic if you fork this file).
- parent: classic

Install (Docker)
----------------
From prestashop-docker/:

  .\install-arden-frontend.ps1

Or manually copy themes/arden and modules/ardenhomelinks into /var/www/html, then:

  chown -R www-data:www-data /var/www/html/themes/arden /var/www/html/modules/ardenhomelinks
  php bin/console prestashop:module install ardenhomelinks -n
  php bin/console prestashop:theme:enable arden -n
  chown -R www-data:www-data /var/www/html/var
  php bin/console cache:warmup --env=prod -n

If files were copied as root, Apache cannot write themes/arden/assets/cache — fix with chown.

Category links
--------------
The module resolves categories by link_rewrite (from the CSV seed):

  dtf-transfers, blank-apparel, accessories, print-services

Import those categories before expecting pillar links to work.
