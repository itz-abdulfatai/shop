import {
  cart,
  deleteCartItem,
  updateCart,
  saveToStorage,
  updateCartItemQuantity,
  formatPrice,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartHtml = "";

function renderCart() {
  cart.forEach((cartItem) => {
    let matchingProduct;
    let html = "";

    products.forEach((product) => {
      if (product.id == cartItem.productId) {
        matchingProduct = product;
      }
    });

    html = `
          <div class="unit-checkout line-border unit-checkout-${
            matchingProduct.id
          }">
              <div class="unit-checkout-heading">Dilivery date: <span>Tuesday, February 20</span></div>
              <div class="inner-1">
                  <div class="checkout-product-image"><img src="${
                    matchingProduct.image
                  }"
                          alt="product image"></div>
                  <div class="checkout-product-description">
                      <div class="checkout-product-name">${
                        matchingProduct.name
                      }</div>
                      <div class="checkout-product-price">${formatPrice(
                        matchingProduct.priceCents
                      )}</div>
                      <div class="checkout-product-quantity">quantity: <span>${
                        cartItem.quantity
                      }</span>
                          <a class="link-primary js-cart-update" data-product-id="${
                            matchingProduct.id
                          }">Update</a> <input data-product-id="${
      matchingProduct.id
    }"  type="" class="quantity-input js-quantity-input js-quantity-input-${
      matchingProduct.id
    }"> <span class="save-quantity-link link-primary" data-product-id="${
      matchingProduct.id
    }" >save</span> <a class="link-primary cart-delete " data-product-id="${
      matchingProduct.id
    }">Delete</a>
                      </div>
                  </div>
              </div>
      
              <div class="inner-2">
                  <div class="checkout-delivery-option-heading">Choose delivery option:</div>
                  <form action="">
                      ${renderDeliveryOptions(matchingProduct, cartItem)}
                      
                  </form>
      
              </div>
              
          </div>
      
      
          `;

    cartHtml += html;
  });

  document.querySelector(".checkout-grid").innerHTML =
    cartHtml ||
    `<div class="no-product" >
no products in cart....

</div>`;
}

renderCart();
updateCart();

const cartDeleteButtons = document.querySelectorAll(".cart-delete");

cartDeleteButtons.forEach((button) => {
  deleteCartItem(button);
});

const updateBtns = document.querySelectorAll(".js-cart-update");

updateBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const parent = document.querySelector(`.unit-checkout-${productId}`);
    parent.classList.add("is-editing-quantity");
  });
});

const saveBtns = document.querySelectorAll(".save-quantity-link");

saveBtns.forEach((savebtn) => {
  savebtn.addEventListener("click", () => {
    const productId = savebtn.dataset.productId;
    const parent = document.querySelector(`.unit-checkout-${productId}`);
    parent.classList.remove("is-editing-quantity");

    const quantityInputValue = document.querySelector(
      `.js-quantity-input-${productId}`
    ).value;

    updateCartItemQuantity(productId, quantityInputValue);

    updateCart();
    saveToStorage();
    location.reload();
  });
});

const quantityInput = document.querySelectorAll(".js-quantity-input");

quantityInput.forEach((input) => {
  input.addEventListener("keyup", () => {
    if (event.key == "Enter") {
      const productId = input.dataset.productId;
      const parent = document.querySelector(`.unit-checkout-${productId}`);
      parent.classList.remove("is-editing-quantity");

      const quantityInputValue = document.querySelector(
        `.js-quantity-input-${productId}`
      ).value;

      updateCartItemQuantity(productId, quantityInputValue);

      updateCart();
      saveToStorage();
      renderCart();
    }
  });
});

function renderDeliveryOptions(matchingProduct, cartItem) {
  let html = "";
  let num = 1;

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    // console.log(today)
    const deliveryDays = today.add(deliveryOption.deliveryDays, "days");
    // console.log(deliveryDays);
    // console.log(deliveryDays.format('dddd,MMMM DD'));

    html += `
    <div class="unit-radio">
    <input 
    ${deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "unchecked"}
    type="radio" name="delivery-option-radio-${
      matchingProduct.id
    }" id="delivery-option-radio-${matchingProduct.id}-${num}">
<label for="delivery-option-radio-${matchingProduct.id}-${num}">
    <div class="delivery-date link-primary"> Tuesday, June 21 </div>
        <div class="delivery-date-description"> ${
          deliveryOption.priceCents === 0
            ? "FREE Shipping"
            : formatPrice(deliveryOption.priceCents)
        } </div>

</label>

</div> 
    
    
    `;
    num++;
  });
  return html;
}

// async function loadPage() {
//   console.log('load page')
//   return "this is the value"

// await  fetch('https://supersimplebackend.dev/images/apple.jpg')

// console.log('this will never come')

// }

// loadPage().then((dataGotten) => {
//   console.log('next step')
//   console.log(dataGotten)
// })

// loadPage()

// xhr.addEventListener('error', () => {
//   console.log('an unexpected error occured. kindly try again later')
// })

// const myPromise =  new Promise((resolve) => {
//   console.log(can)
//   resolve('v')
// }).then((valueInResolve) => {
//   console.log(valueInResolve)
// }).catch((error) => {
//   console.log("didnt work");
//   console.log(error)
// })

// try {
//   a + 1
// } catch (error) {
//   console.log(error)
// }

// async function postSomething() {
//   try {
//     const response = await fetch("https://aurl.com/order", {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         cart: cart, 
//       }),
//     });
//     const order = await response.json();
//     console.log(order);
//     // code for using the respnse the backend gave
//   } catch (error) {
//     console.log('the error is', error);
//   }
// }

// postSomething();
