{**
 * "No Designer? No Problem" — how-it-works marketing section (matches ardensprint.com).
 *}
<section class="arden-how-it-works" aria-labelledby="arden-how-it-works-title">
  <div class="arden-how-it-works__inner">
    <header class="arden-how-it-works__head">
      <p class="arden-section-eyebrow">{l s='How it works' d='Shop.Theme.Global'}</p>
      <h2 id="arden-how-it-works-title" class="arden-display arden-how-it-works__title">{l s='No designer? No problem.' d='Shop.Theme.Global'}</h2>
      <p class="arden-how-it-works__lead">{l s='From idea to finished product in three simple steps — no design experience needed.' d='Shop.Theme.Global'}</p>
    </header>
    <div class="arden-how-it-works__grid">
      <div class="arden-how-step">
        <span class="arden-how-step__num">1</span>
        <div class="arden-how-step__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <h3 class="arden-how-step__title">{l s='Upload your design' d='Shop.Theme.Global'}</h3>
        <p class="arden-how-step__desc">{l s='Use our Design Studio or upload your own artwork. We accept PNG, SVG, PDF, and AI files.' d='Shop.Theme.Global'}</p>
      </div>
      <div class="arden-how-step">
        <span class="arden-how-step__num">2</span>
        <div class="arden-how-step__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 00-8 0v2"/><circle cx="12" cy="15" r="2"/></svg>
        </div>
        <h3 class="arden-how-step__title">{l s='We print & produce' d='Shop.Theme.Global'}</h3>
        <p class="arden-how-step__desc">{l s='Our production team handles DTF printing, pressing, and quality checks — so every piece leaves right.' d='Shop.Theme.Global'}</p>
      </div>
      <div class="arden-how-step">
        <span class="arden-how-step__num">3</span>
        <div class="arden-how-step__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16h6"/><path d="M16 16l-4 4"/><path d="M16 16l-4-4"/><path d="M3 21v-7a4 4 0 014-4h5"/><circle cx="7" cy="6" r="4"/></svg>
        </div>
        <h3 class="arden-how-step__title">{l s='Ship to you or your customer' d='Shop.Theme.Global'}</h3>
        <p class="arden-how-step__desc">{l s='We deliver to your shop, your event, or dropship direct to your end customer — your brand, our production.' d='Shop.Theme.Global'}</p>
      </div>
    </div>
    <div class="arden-how-it-works__cta">
      <a class="arden-btn arden-btn--primary" href="{$arden_cms.design_studio|default:$urls['pages']['contact']}">{l s='Try Design Studio' d='Shop.Theme.Global'}</a>
      <a class="arden-btn arden-btn--ghost" href="{$arden_shop|default:$urls['pages']['new_products']}">{l s='Browse catalog' d='Shop.Theme.Global'}</a>
    </div>
  </div>
</section>
