{**
 * Five-way category strip with images — matches ardensprint.com layout.
 *}
<section class="arden-category-tiles" aria-labelledby="arden-category-tiles-title">
  <div class="arden-category-tiles__inner">
    <h2 id="arden-category-tiles-title" class="visually-hidden">{l s='Shop by category' d='Shop.Theme.Catalog'}</h2>
    <div class="arden-category-tiles__grid">
      <a class="arden-cat-tile arden-cat-tile--img" href="{$arden_cat.dtf|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='DTF transfers' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='Film, gang sheets & sizing' d='Shop.Theme.Catalog'}</span>
        <img class="arden-cat-tile__img" src="{$urls.img_ps_url}../themes/arden/assets/img/cat-dtf.png" alt="DTF transfer films" loading="lazy" width="280" height="200">
      </a>
      <a class="arden-cat-tile arden-cat-tile--img" href="{$arden_cat.blank|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Blank apparel' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='Headwear, tees, fleece & more' d='Shop.Theme.Catalog'}</span>
        <img class="arden-cat-tile__img" src="{$urls.img_ps_url}../themes/arden/assets/img/cat-blanks.png" alt="Blank t-shirts" loading="lazy" width="280" height="200">
      </a>
      <a class="arden-cat-tile arden-cat-tile--img" href="{$arden_cat.psvc|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Custom print' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='Services & fulfillment' d='Shop.Theme.Catalog'}</span>
        <img class="arden-cat-tile__img" src="{$urls.img_ps_url}../themes/arden/assets/img/cat-services.png" alt="Custom print services" loading="lazy" width="280" height="200">
      </a>
      <a class="arden-cat-tile arden-cat-tile--img" href="{$arden_shop|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Shop' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='New arrivals & featured' d='Shop.Theme.Catalog'}</span>
        <img class="arden-cat-tile__img" src="{$urls.img_ps_url}../themes/arden/assets/img/cat-accessories.png" alt="Shop accessories" loading="lazy" width="280" height="200">
      </a>
      <a class="arden-cat-tile arden-cat-tile--img" href="{$arden_pod|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Print on demand' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='No minimums — ship direct' d='Shop.Theme.Catalog'}</span>
        <img class="arden-cat-tile__img" src="{$urls.img_ps_url}../themes/arden/assets/img/hero-bg.png" alt="Print on demand" loading="lazy" width="280" height="200">
      </a>
    </div>
  </div>
</section>
