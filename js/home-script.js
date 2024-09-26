// all imports
import { products } from "../data/products.js";
import { cart, addToCart, updateCart, formatPrice } from "../data/cart.js";

let productsHTML = "";
renderHtml();

/** 
to create and call a function at the same time you can wrap it in brackets and add () at the end of the function 
any needed parameters can be added to the () added at the end 
i would have used it but 
- it can not be reinvoked later if i do so*/

function renderHtml() {
  products.forEach((product) => {
    const html = `<div class="product-container">
      <div class="product-image">
          <img src="${product.image}">
      </div>
      <div class="product-description">
          <div class="product-name">${product.name}</div>
          <div class="product-rating">Rating - ${
            product.rating.stars
          }(<span class="product-Rating-count">${
      product.rating.count
    }</span>)</div>
          <div class="add-cart-count"><select class="js-quantity-selector-${
            product.id
          }" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select></div>
          
          <div class="product-price">${formatPrice(product.priceCents)}</div>
  
      </div>
      <div class="add-cart">
          <button class="add-cart-btn" data-product-id="${
            product.id
          }">Add to Cart <div class="added-to-cart-tick-${
      product.id
    } added ">✅</div> </button>
      </div>
  </div>`;
    productsHTML += html;
  });
}

const productsGrid = document.querySelector(".product-grid");
productsGrid.innerHTML =
  productsHTML ||
  `<div class="no-product" >
no products to show....

</div>`;



updateCart();

const addCartBtns = document.querySelectorAll(".add-cart-btn");

addCartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button);
    updateCart();
  });
});
