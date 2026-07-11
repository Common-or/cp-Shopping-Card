// ===== OBJECT-ORIENTED JAVASCRIPT (OOJ) SHOPPING CART =====

// ============================================
// PART 1: CLASS DEFINITIONS
// These are blueprints for creating objects
// ============================================

// Product class: represents a single product (Baskets, Socks, etc.)
// Each product has: id, name, price, image, and description
class Product {
  constructor(id, name, price, image, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  getDetails() {
    return `${this.name} (${this.price} $)`;
  }
}

// ShoppingCartItem class: represents one product IN the cart
// It holds a product reference AND how many of that product the user wants
class ShoppingCartItem {
  constructor(product, quantity = 0) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method: calculate how much this item costs (price × quantity)
  calculateTotalPrice() {
    return this.product.price * this.quantity;
  }

  getDetails() {
    return `${this.product.name} x${this.quantity} = ${this.calculateTotalPrice()} $`;
  }
}

// ShoppingCart class: the main cart that holds multiple items
// This is where we manage adding/removing items and calculating totals
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Find an item in the cart by product id
  getItem(productId) {
    return this.items.find((item) => item.product.id === productId);
  }

  // Add a product to the cart (or increase quantity if already there)
  addItem(product, quantity = 1) {
    const existingItem = this.getItem(product.id);

    if (existingItem) {
      // Item already in cart, just increase the quantity
      existingItem.quantity += quantity;
      return existingItem;
    }

    // Item not in cart, create a new ShoppingCartItem and add it
    const item = new ShoppingCartItem(product, quantity);
    this.items.push(item);
    return item;
  }

  // Remove an item completely from the cart
  removeItem(productId) {
    const index = this.items.findIndex((item) => item.product.id === productId);

    if (index === -1) {
      return null;
    }

    const [removedItem] = this.items.splice(index, 1);
    return removedItem;
  }

  // Decrease quantity of an item (or remove it if quantity hits 0)
  decreaseItem(productId, quantity = 1) {
    const item = this.getItem(productId);

    if (!item) {
      return null;
    }

    // Reduce quantity, but don't go below 0
    item.quantity = Math.max(0, item.quantity - quantity);

    // If quantity is now 0, remove the item completely
    if (item.quantity === 0) {
      this.removeItem(productId);
    }

    return item;
  }

  // Get total number of items in cart (sum of all quantities)
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price of everything in the cart
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
  }

  // Display all cart items in the console with totals
  displayCartItems() {
    if (this.items.length === 0) {
      console.log('The cart is empty.');
      return;
    }

    console.log('===== SHOPPING CART =====');
    this.items.forEach((item) => {
      console.log(item.getDetails());
    });
    console.log('-------------------------');
    console.log(`Total items: ${this.getTotalItems()}`);
    console.log(`Total price: ${this.getTotalPrice()} $`);
    console.log('=========================\n');
  }
}

// ============================================
// PART 2: PAGE SETUP & RENDERING
// This runs when the HTML page has finished loading
// ============================================

// Wait for the page (DOM) to fully load before running this code
document.addEventListener('DOMContentLoaded', async () => {
  // Step 1: Find HTML elements we'll need to update
  const totalEls = document.querySelectorAll('.total');
  const totalItemsEls = document.querySelectorAll('.total-items');
  const listProductsEl = document.querySelector('.list-products');

  // Create one shopping cart for this page
  const cart = new ShoppingCart();

  // ---- Helper Functions ----
  // These are small tools we'll use multiple times

  // Add " $" to a number (100 becomes "100 $")
  function formatPrice(price) {
    return `${price} $`;
  }

  // Update the total price shown at the top of the page
  function updateTotal() {
    totalEls.forEach(el => el.textContent = ` ${cart.getTotalPrice()} $ `);
    totalItemsEls.forEach(el => el.textContent = ` ${cart.getTotalItems()} `);
  }

  function renderProductCard(product) {
    const card = document.createElement('div');
    card.className = 'pcard';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'pcard-img-wrap';

    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.className = 'pcard-img';
      img.alt = product.name;
      imgWrap.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'pcard-ph';
      ph.textContent = product.name.charAt(0);
      imgWrap.appendChild(ph);
    }

    if (product.id <= 3) {
      const tag = document.createElement('span');
      tag.className = 'pcard-tag';
      tag.textContent = 'New';
      imgWrap.appendChild(tag);
    }

    card.appendChild(imgWrap);

    const body = document.createElement('div');
    body.className = 'pcard-body';
    body.innerHTML = `
      <div class="pcard-cat">Featured</div>
      <div class="pcard-row">
        <span class="pcard-name">${product.name}</span>
        <span class="pcard-price">${formatPrice(product.price)}</span>
      </div>
      <p class="pcard-desc">${product.description}</p>
      <div class="pcard-foot">
        <div class="qty">
          <button class="minus" aria-label="Decrease">-</button>
          <span class="qty-val">0</span>
          <button class="plus" aria-label="Increase">+</button>
        </div>
        <div class="acts">
          <button class="act-btn trash" aria-label="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Remove
          </button>
          <button class="act-btn heart" aria-label="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            Save
          </button>
        </div>
      </div>
    `;
    card.appendChild(body);
    listProductsEl.appendChild(card);

    const quantityEl = body.querySelector('.qty-val');
    const plusBtn = body.querySelector('.plus');
    const minusBtn = body.querySelector('.minus');
    const trashBtn = body.querySelector('.trash');
    const heartBtn = body.querySelector('.heart');

    const syncCardQuantity = () => {
      const item = cart.getItem(product.id);
      const quantity = item ? item.quantity : 0;
      quantityEl.textContent = quantity;
      updateTotal();
    };

    plusBtn.addEventListener('click', () => {
      cart.addItem(product, 1);
      syncCardQuantity();
    });

    minusBtn.addEventListener('click', () => {
      cart.decreaseItem(product.id, 1);
      syncCardQuantity();
    });

    trashBtn.addEventListener('click', () => {
      cart.removeItem(product.id);
      syncCardQuantity();
    });

    heartBtn.addEventListener('click', () => {
      heartBtn.classList.toggle('liked');
    });

    syncCardQuantity();
  }

  // Update cart summary display
  function renderCartSummary() {
    updateTotal();
  }

  // ============================================
  // PART 3: FETCH JSON AND RENDER PRODUCTS
  // This is where the magic happens!
  // ============================================

  try {
    // Step 1: Get the products.json file from the server
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error(`Failed to load products.json (${response.status})`);
    }

    // Step 2: Convert the JSON text into a JavaScript object we can use
    const data = await response.json();

    // Step 3: Take each product from the JSON and create a Product object
    const products = (data.products || []).map(
      (product) => new Product(product.id, product.name, product.price, product.image, product.description)
    );

    // Step 4: Clear the page and build product cards for each product
    listProductsEl.innerHTML = '';
    products.forEach((product) => renderProductCard(product));

    // Step 5: Show the initial total
    renderCartSummary();

    // ============================================
    // CONSOLE TEST
    // Open browser console (F12 or Cmd+Option+J) to see output
    // ============================================
    console.log('%c🧪 Running OOP Shopping Cart Tests...', 'font-size: 14px; font-weight: bold;');

    // 1. Create products
    const p1 = new Product(1, 'Baskets', 100);
    const p2 = new Product(2, 'Socks', 20);
    const p3 = new Product(3, 'Bag', 50);

    // 2. Create a shopping cart
    const testCart = new ShoppingCart();

    // 3. Add items to the cart
    testCart.addItem(p1, 2);
    testCart.addItem(p2, 3);
    testCart.addItem(p3, 1);

    // 4. Display the cart
    testCart.displayCartItems();

    // 5. Remove an item from the cart
    console.log('Removing Socks (product id 2)...');
    testCart.removeItem(2);
    testCart.displayCartItems();

    console.log('%c✅ Tests complete!', 'font-size: 14px; font-weight: bold;');
  } catch (error) {
    // If something went wrong, show an error message instead of crashing
    listProductsEl.innerHTML = `
      <div class="error-banner">
        Could not load products from products.json. ${error.message}
      </div>
    `;
    console.error(error);
  }
});
