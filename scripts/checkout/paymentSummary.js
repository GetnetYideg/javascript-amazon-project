import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../utils/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.productQuantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const totalTax = 0.1 * totalBeforeTaxCents;
    const totalCents = totalBeforeTaxCents + totalTax;
    let cartQuantity = 0;
    cart.forEach((item) =>{
        cartQuantity += item.productQuantity;
    });
    document.querySelector('.return-to-home-link').innerHTML = `${cartQuantity} items`;
    let paymentHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
document.querySelector('.js-payment-summary').innerHTML = paymentHtml;
}