

export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    quantity: 2,
    deliveryOptionId: 2
  },
  {
    productId: "d339adf3-e004-4c20-a120-40e8874c66cb",
    quantity: 1,
    deliveryOptionId: 1
  },
  {
    productId: "90abdula-386d-422e-82f0-6fbfataibf969",
    quantity: 5,
    deliveryOptionId: 3
  },
];

export function addToCart(button) {
  const productId = button.dataset.productId;
  let matchingItem;

  const quantity = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(quantity);
  } else {
    cart.push({
      productId,
      quantity: Number(quantity),
    });
  }
  const added = document.querySelector(`.added-to-cart-tick-${productId}`);
  added.classList.add("have-added");
  let timeOut;

  // clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    added.classList.remove("have-added");
  }, 2000);

  saveToStorage();
}

export function deleteCartItem(button) {
  button.addEventListener("click", () => {
    let matchingProduct;
    let newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId == button.dataset.productId) {
        matchingProduct = cartItem;
      }
    });

    cart.forEach((cartItem) => {
      if (cartItem !== matchingProduct) {
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    const container = document.querySelector(
      `.unit-checkout-${button.dataset.productId}`
    );

    container.remove();

    saveToStorage();
    updateCart();
  });
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCart() {
  let totalCart = 0;

  cart.forEach((cartItem) => {
    totalCart += cartItem.quantity;
  });

  document.querySelector(".cart-quantity-display").innerHTML = `${totalCart}`;
}

export function updateCartItemQuantity(productId, quantityInputValue) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      matchingProduct = cartItem;
    }
  });

  if (
    quantityInputValue &&
    Number(quantityInputValue) > 0 &&
    Number(quantityInputValue) < 100
  ) {
    matchingProduct.quantity = Number(quantityInputValue);
  }
}

export function formatPrice(priceCents) {
  
  return '$' + (priceCents / 100).toFixed(2);

}