{**
 * Shopping cart — Arden adds short “before you pay” clarity next to totals.
 *}
{extends file=$layout}

{block name='content'}

  <section id="main">
    <div class="cart-grid row">

      <div class="cart-grid-body col-lg-8">

        <div class="card cart-container">
          <div class="card-block">
            <h1 class="h1">{l s='Shopping Cart' d='Shop.Theme.Checkout'}</h1>
          </div>
          <hr class="separator">
          {block name='cart_overview'}
            {include file='checkout/_partials/cart-detailed.tpl' cart=$cart}
          {/block}
        </div>

        {block name='continue_shopping'}
          <a class="label" href="{$urls.pages.index}">
            <i class="material-icons">chevron_left</i>{l s='Continue shopping' d='Shop.Theme.Actions'}
          </a>
        {/block}

        {block name='hook_shopping_cart_footer'}
          {hook h='displayShoppingCartFooter'}
        {/block}
      </div>

      <div class="cart-grid-right col-lg-4">

        {block name='cart_summary'}
          <div class="card cart-summary">

            {block name='hook_shopping_cart'}
              {hook h='displayShoppingCart'}
            {/block}

            {block name='cart_totals'}
              {include file='checkout/_partials/cart-detailed-totals.tpl' cart=$cart}
            {/block}

            {block name='cart_actions'}
              {include file='checkout/_partials/cart-detailed-actions.tpl' cart=$cart}
            {/block}

          </div>
        {/block}

        {if !empty($cart.products)}
        <aside class="arden-cart-nextsteps card" aria-labelledby="arden-cart-nextsteps-title">
          <div class="card-block">
            <h2 id="arden-cart-nextsteps-title" class="h6 arden-cart-nextsteps__title">{l s='Before you pay' d='Shop.Theme.Checkout'}</h2>
            <ul class="arden-cart-nextsteps__list">
              <li>{l s='Shipping choices and delivery estimates appear at checkout.' d='Shop.Theme.Checkout'}</li>
              <li>{l s='Taxes (if applicable) are based on your shipping address.' d='Shop.Theme.Checkout'}</li>
              <li>{l s='You’ll receive an order confirmation email after payment.' d='Shop.Theme.Checkout'}</li>
            </ul>
          </div>
        </aside>
        {/if}

        {block name='hook_reassurance'}
          {hook h='displayReassurance'}
        {/block}

      </div>

    </div>

    {hook h='displayCrossSellingShoppingCart'}

  </section>
{/block}
