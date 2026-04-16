{**
 * Five pillars — service areas with cleaner card design.
 *}
<section class="arden-pillars" aria-label="What you can do">
  <div class="arden-pillars__wrap">
    <div class="text-center" style="max-width:40rem;margin:0 auto 2rem">
      <p class="arden-section-eyebrow" style="justify-content:center">{l s='What we do' d='Shop.Theme.Catalog'}</p>
      <h2 class="arden-display" style="font-size:clamp(1.5rem,3vw,2rem)">{l s='Everything your shop needs under one roof' d='Shop.Theme.Catalog'}</h2>
    </div>
  <div class="arden-pillars__grid arden-pillars__grid--5">
    <a class="arden-pillar" href="{$arden_cat.psvc|default:$urls['pages']['new_products']}">
      <p class="arden-pillar__kicker">Print on demand</p>
      <h3 class="arden-pillar__title">POD fulfillment</h3>
      <p class="arden-pillar__desc">We print and ship orders — you focus on design and sales.</p>
      <span class="arden-pillar__cta">Explore →</span>
    </a>
    <a class="arden-pillar" href="{$arden_shop|default:$urls['pages']['new_products']}">
      <p class="arden-pillar__kicker">Catalog</p>
      <h3 class="arden-pillar__title">Shop products</h3>
      <p class="arden-pillar__desc">Apparel, transfers, and add-ons you can sell or decorate.</p>
      <span class="arden-pillar__cta">Browse →</span>
    </a>
    <a class="arden-pillar" href="{$arden_cat.dtf|default:$urls['pages']['new_products']}">
      <p class="arden-pillar__kicker">Heat transfer</p>
      <h3 class="arden-pillar__title">DTF transfers</h3>
      <p class="arden-pillar__desc">Gang sheets, sizing tools, and press-ready film.</p>
      <span class="arden-pillar__cta">Explore →</span>
    </a>
    <a class="arden-pillar" href="{$arden_cat.blank|default:$urls['pages']['new_products']}">
      <p class="arden-pillar__kicker">Wholesale</p>
      <h3 class="arden-pillar__title">Blank apparel</h3>
      <p class="arden-pillar__desc">Core and premium blanks for your own press.</p>
      <span class="arden-pillar__cta">Explore →</span>
    </a>
    <a class="arden-pillar" href="{$arden_contact|default:$urls['pages']['contact']}">
      <p class="arden-pillar__kicker">Programs</p>
      <h3 class="arden-pillar__title">Custom &amp; volume</h3>
      <p class="arden-pillar__desc">Quotes, rush lanes, and brand-consistent runs.</p>
      <span class="arden-pillar__cta">Contact →</span>
    </a>
  </div>
  </div>
</section>
