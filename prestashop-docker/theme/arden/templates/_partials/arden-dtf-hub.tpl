{**
 * DTF Hub — dark branded section with SVG icons per card.
 *}
<section class="arden-dtf-hub" aria-labelledby="arden-dtf-hub-title">
  <div class="arden-dtf-hub__inner">
  <div class="arden-dtf-hub__head">
    <p class="arden-section-eyebrow">{l s='DTF Hub' d='Shop.Theme.Catalog'}</p>
    <h2 id="arden-dtf-hub-title" class="arden-display arden-dtf-hub__title">{l s='Pick your workflow' d='Shop.Theme.Catalog'}</h2>
    <p class="arden-dtf-hub__kicker">{l s='Most DTF orders ship within 24 hours. Choose the path that matches how you design and produce.' d='Shop.Theme.Catalog'}</p>
  </div>
  <div class="arden-dtf-hub__grid">
    <a class="arden-dtf-card" href="{$arden_dtf_tools.dtf_size|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.174 6.812a1 1 0 00-3.986-3.987L3.842 16.174a2 2 0 00-.5.83l-1.321 4.352a.5.5 0 00.623.622l4.353-1.32a2 2 0 00.83-.497z"/><path d="M15 5l4 4"/></svg>
      </span>
      <h3 class="arden-dtf-card__title">Transfer by size</h3>
      <p class="arden-dtf-card__desc">Print transfers in the exact dimensions your job requires — from hat logos to full-chest.</p>
      <span class="arden-dtf-card__cta">View sizes →</span>
    </a>
    <a class="arden-dtf-card" href="{$arden_dtf_tools.dtf_gang|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      </span>
      <h3 class="arden-dtf-card__title">Gang sheet builder</h3>
      <p class="arden-dtf-card__desc">Lay out multiple artworks on one sheet to maximize yield and cut per-piece cost.</p>
      <span class="arden-dtf-card__cta">Open builder →</span>
    </a>
    <a class="arden-dtf-card" href="{$arden_dtf_tools.dtf_upload|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      </span>
      <h3 class="arden-dtf-card__title">Upload gang sheet</h3>
      <p class="arden-dtf-card__desc">Send a print-ready file — we verify and queue same day with color-matched output.</p>
      <span class="arden-dtf-card__cta">Upload file →</span>
    </a>
    <a class="arden-dtf-card" href="{$arden_cat.dtf|default:$urls['pages']['new_products']}">
      <span class="arden-dtf-card__step" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      </span>
      <h3 class="arden-dtf-card__title">Ready-to-press designs</h3>
      <p class="arden-dtf-card__desc">Stock artwork you can ship or apply in minutes. Ready for heat transfer.</p>
      <span class="arden-dtf-card__cta">Browse designs →</span>
    </a>
  </div>
  </div>
</section>
