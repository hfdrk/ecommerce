Arden's Print — PrestaShop catalog & content (matches the Next.js demo in this repo)

1) Generate CSVs (optional — prebuilt arden_categories.csv and arden_products.csv are committed)
   - From this folder, with PHP available:
       php generate-catalog-csv.php

2) Import into PrestaShop (Back Office)
   - Sign in: http://localhost:8081/admin-arden/ (or your PS_FOLDER_ADMIN)
   - Go to: Configure → Advanced Parameters → Import
   - Entity: Categories — choose arden_categories.csv, UTF-8, semicolon, "Yes" for first row labels
   - Import. Then Entity: Products — arden_products.csv with the same settings
   - If prompted, download the "sample" field matching from PrestaShop docs only if columns mismatch (these files match PS 8.1 sample headers)

3) Seed shop name, CMS pages, home featured category
   - docker cp seed/arden_seed_store.php arden_ps_shop:/var/www/html/seed/arden_seed_store.php
   - docker exec arden_ps_shop mkdir -p /var/www/html/seed
   - docker exec arden_ps_shop php /var/www/html/seed/arden_seed_store.php

4) Menus & footer (manual, once)
   - Design → Link List (or Theme & Logo → "Link widget" depending on version) — add links to CMS pages:
       /index.php?id_cms=… or friendly URLs under "Content" for: About, Privacy, Terms, Returns
   - Contact page uses the native Contact form module (Shop parameters → Contact). Address/phone/email match the Next demo in the seed where applicable.

5) Optional cleanup
   - Remove default demo products/categories from the sample catalog if you no longer need them (Catalog → Products / Categories).

Tax rule ID in products CSV is set to 9 to match default demo products in a typical US install. If your shop uses a different default, change column "Tax rules ID" in arden_products.csv and re-import, or edit products in BO.

Arden storefront theme (hero + pillars + CSS)
---------------------------------------------
After the catalog exists, deploy the child theme + small module from the repo root:

  ..\\install-arden-frontend.ps1

See ..\\theme\\README.txt for details.

Automated catalog import (CLI, no BO)
--------------------------------------
From the repo, copy seed/cli-import-arden-catalog.php into the container and run as www-data:

  docker cp seed/cli-import-arden-catalog.php arden_ps_shop:/var/www/html/seed/
  docker cp seed/ardensprint_media.php arden_ps_shop:/var/www/html/seed/
  docker exec -u www-data arden_ps_shop php /var/www/html/seed/cli-import-arden-catalog.php

Skips categories/products that already exist (link_rewrite / reference). Cover art uses public https://ardensprint.com/assets/media URLs (see ardensprint_media.php).
Sets HOME_FEATURED_CAT to the "dtf-transfers" category so the home "featured products" block matches Arden.

Hero slider + refresh covers from live assets (after import):
  docker cp seed/ardensprint_sync_demo_assets.php arden_ps_shop:/var/www/html/seed/
  docker exec -u www-data arden_ps_shop php /var/www/html/seed/ardensprint_sync_demo_assets.php

Full pipeline (import + CMS seed + theme)
-----------------------------------------
From prestashop-docker:

  .\deploy-arden-full.ps1

Navigation redirects to home / “one page”
-----------------------------------------
If the shop was installed with domain localhost:8081 but you browse http://127.0.0.1:8081/,
PrestaShop will not match the host and will 302 every friendly URL back to /. Either use
http://localhost:8081/ or run:

  docker exec -u www-data arden_ps_shop php /var/www/html/seed/arden_register_loopback_shop_url.php

(Also run automatically at the start of deploy-arden-full.ps1.)
