{**
 * Five-way category strip — mirrors live homepage IA (DTF / Blanks / Custom / Shop / POD).
 *}
<section class="arden-category-tiles" aria-labelledby="arden-category-tiles-title">
  <div class="arden-category-tiles__inner">
    <h2 id="arden-category-tiles-title" class="visually-hidden">{l s='Shop by category' d='Shop.Theme.Catalog'}</h2>
    <div class="arden-category-tiles__grid">
      <a class="arden-cat-tile" href="{$arden_cat.dtf|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='DTF transfers' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='Film, gang sheets & sizing' d='Shop.Theme.Catalog'}</span>
      </a>
      <a class="arden-cat-tile" href="{$arden_cat.blank|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Blank apparel' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='Headwear, tees, fleece & more' d='Shop.Theme.Catalog'}</span>
      </a>
      <a class="arden-cat-tile" href="{$arden_cat.psvc|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Custom print' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='Services & fulfillment' d='Shop.Theme.Catalog'}</span>
      </a>
      <a class="arden-cat-tile" href="{$arden_shop|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Shop' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='New arrivals & featured' d='Shop.Theme.Catalog'}</span>
      </a>
      <a class="arden-cat-tile" href="{$arden_pod|default:$urls['pages']['new_products']}">
        <span class="arden-cat-tile__label">{l s='Print on demand' d='Shop.Theme.Catalog'}</span>
        <span class="arden-cat-tile__hint">{l s='No minimums — ship to you or your customer' d='Shop.Theme.Catalog'}</span>
      </a>
    </div>
  </div>
</section>
