{**
 * DTF Printing Hub — four cards (links from arden_dtf_tools + category for ready transfer).
 *}
<section class="arden-dtf-hub" aria-labelledby="arden-dtf-hub-title">
  <div class="arden-dtf-hub__inner">
  <div class="arden-dtf-hub__head">
    <p class="arden-section-eyebrow">{l s='DTF transfers' d='Shop.Theme.Catalog'}</p>
    <h2 id="arden-dtf-hub-title" class="arden-display arden-dtf-hub__title">{l s='Your DTF printing hub' d='Shop.Theme.Catalog'}</h2>
    <p class="arden-dtf-hub__kicker">{l s='Ready in 24 hours — pick your perfect option below' d='Shop.Theme.Catalog'}</p>
    <p class="arden-dtf-hub__sub">{l s='Size transfers, build gang sheets, or upload print-ready art. Interactive builders and the full workflow live on' d='Shop.Theme.Catalog'} <a href="https://ardensprint.com/" rel="noopener noreferrer">ardensprint.com</a>.</p>
  </div>
  <div class="arden-dtf-hub__grid">
    <a class="arden-dtf-card" href="{$arden_dtf_tools.dtf_size|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">01</span>
      <h3 class="arden-dtf-card__title">DTF transfer by size</h3>
      <p class="arden-dtf-card__desc">Print transfers in your exact size. Perfect for custom fits and unique projects.</p>
      <span class="arden-dtf-card__cta">Get started</span>
    </a>
    <a class="arden-dtf-card" href="{$arden_dtf_tools.dtf_gang|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">02</span>
      <h3 class="arden-dtf-card__title">DTF gang sheet builder</h3>
      <p class="arden-dtf-card__desc">Design your gang sheet online. Add multiple designs to maximize your sheet.</p>
      <span class="arden-dtf-card__cta">Get started</span>
    </a>
    <a class="arden-dtf-card" href="{$arden_dtf_tools.dtf_upload|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">03</span>
      <h3 class="arden-dtf-card__title">Upload a print-ready file</h3>
      <p class="arden-dtf-card__desc">Upload and print instantly. Fast, high-quality results with no hassle.</p>
      <span class="arden-dtf-card__cta">Upload</span>
    </a>
    <a class="arden-dtf-card" href="{$arden_cat.dtf|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">04</span>
      <h3 class="arden-dtf-card__title">DTF ready transfer</h3>
      <p class="arden-dtf-card__desc">Heat-press ready designs. Apply easily to any fabric in minutes.</p>
      <span class="arden-dtf-card__cta">Shop now</span>
    </a>
  </div>
  </div>
</section>
