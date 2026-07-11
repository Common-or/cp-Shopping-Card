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
  const totalEl = document.querySelector('.total');  // Where to show the total price
  const listProductsEl = document.querySelector('.list-products');  // Where to put product cards

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
    totalEl.textContent = ` ${cart.getTotalPrice()} $ `;
  }

  // Create a placeholder (like "S" for Sneakers) when product has no image
  function createPlaceholder(product) {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-placeholder';
    placeholder.textContent = product.name.charAt(0).toUpperCase();
    return placeholder;
  }

  // ---- Main Rendering Function ----
  // This function builds ONE product card and adds it to the page
  function renderProductCard(product) {
    // Create the card container
    const wrapper = document.createElement('div');
    wrapper.className = 'card-body';

    const card = document.createElement('div');
    card.className = 'card product-card';
    card.style.width = '18rem';

    // Add image or placeholder
    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.className = 'card-img-top';
      img.alt = product.name.toLowerCase();
      card.appendChild(img);
    } else {
      // No image? Show a letter placeholder instead
      card.appendChild(createPlaceholder(product));
    }

    // Add product info (title, description, price)
    const body = document.createElement('div');
    body.className = 'card-body';

    body.innerHTML = `
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <h4 class="unit-price">${formatPrice(product.price)}</h4>
    `;

    // Add quantity controls (+ button, quantity display, - button)
    const controls = document.createElement('div');
    controls.innerHTML = `
      <i class="fas fa-plus-circle" role="button" aria-label="Increase quantity"></i>
      <span class="quantity">0</span>
      <i class="fas fa-minus-circle" role="button" aria-label="Decrease quantity"></i>
    `;

    // Add action buttons (delete, favorite)
    const actions = document.createElement('div');
    actions.innerHTML = `
      <i class="fas fa-trash-alt" role="button" aria-label="Remove item"></i>
      <i class="fas fa-heart" role="button" aria-label="Favorite item"></i>
    `;

    // Assemble all the parts into the card
    body.appendChild(controls);
    body.appendChild(actions);
    card.appendChild(body);
    wrapper.appendChild(card);

    // Add the finished card to the page
    listProductsEl.appendChild(wrapper);

    // ---- Wire up the buttons ----
    // Find the buttons in this card so we can add click handlers
    const quantityEl = controls.querySelector('.quantity');
    const plusBtn = controls.querySelector('.fa-plus-circle');
    const minusBtn = controls.querySelector('.fa-minus-circle');
    const trashBtn = actions.querySelector('.fa-trash-alt');
    const heartBtn = actions.querySelector('.fa-heart');

    // Helper: update this card's quantity display and the total
    const syncCardQuantity = () => {
      const item = cart.getItem(product.id);
      const quantity = item ? item.quantity : 0;
      quantityEl.textContent = quantity;
      updateTotal();
    };

    // Plus button: add 1 more of this product to the cart
    plusBtn.addEventListener('click', () => {
      cart.addItem(product, 1);
      syncCardQuantity();
    });

    // Minus button: remove 1 of this product from the cart
    minusBtn.addEventListener('click', () => {
      cart.decreaseItem(product.id, 1);
      syncCardQuantity();
    });

    // Trash button: remove all of this product from the cart
    trashBtn.addEventListener('click', () => {
      cart.removeItem(product.id);
      syncCardQuantity();
    });

    // Heart button: toggle favorite status (changes color)
    heartBtn.addEventListener('click', () => {
      heartBtn.classList.toggle('liked');
      heartBtn.style.color = heartBtn.classList.contains('liked') ? 'red' : 'black';
    });

    // Initial sync to show the current quantity
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
    const response = await fetch('../products.json');
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
      <div class="alert alert-danger w-100" role="alert">
        Could not load products from products.json. ${error.message}
      </div>
    `;
    console.error(error);
  }
});
