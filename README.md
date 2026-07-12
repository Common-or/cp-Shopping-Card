# Shopping Cart - OOJ DOM Project

A shopping cart exercise rebuilt with Object-Oriented JavaScript, vanilla JS, HTML, and CSS.

## Overview

This checkpoint recreates the shopping cart from the DOM exercise using ES6 classes for `Product`, `ShoppingCartItem`, and `ShoppingCart`.

## Classes

### Product
Stores the product `id`, `name`, and `price`, plus the optional `image` and `description` used by the UI.

### ShoppingCartItem
Stores a `product` and its `quantity`, and exposes `calculateTotalPrice()` for the line total.

### ShoppingCart
Stores an array of `ShoppingCartItem` instances and provides methods to:
- get the total number of items in the cart
- add items
- remove items
- display cart items in the console

## Demo Flow

The script tests the required behavior by:
1. Creating products
2. Creating a shopping cart
3. Adding items to the cart
4. Displaying the cart
5. Removing an item from the cart

Open the browser console to see the test output.

## UI Behavior

- Click + to increase quantity
- Click - to decrease quantity
- Click trash to remove the product from the cart
- The total price updates in real time

