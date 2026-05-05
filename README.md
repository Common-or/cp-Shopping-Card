# Shopping Cart - DOM Project 1

A functional shopping cart built with vanilla JavaScript, HTML, and CSS.

## Overview

Manage pre-selected items in a shopping cart. Adjust quantities, delete items, toggle favorites, and see the total price update in real-time.

Deadline: 17.05.2026

## Features

- Increase or decrease item quantities with +/- buttons
- Delete items from the cart
- Toggle favorite items with a heart button (turns red when liked)
- Real-time total price calculation
- Responsive design with Bootstrap 5

## Technologies

- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5
- Font Awesome 6

## Project Structure

```
cp-Shopping-Card/
├── index.html
├── js/script.js
├── style/style.css
├── assets/
│   ├── baskets.png
│   ├── socks.png
│   └── bag.png
└── README.md
```

## Getting Started

1. Clone the repository and navigate to the folder
2. Open `index.html` in a browser or serve locally:
   ```bash
   python -m http.server 8000
   ```
3. Open http://localhost:8000

## Usage

- Click + to increase quantity
- Click - to decrease quantity (minimum 0)
- Click trash icon to remove an item
- Click heart icon to toggle favorite
- Total price updates automatically

## Implementation

- DOM event listeners on +/- buttons, delete, and like icons
- Real-time price calculation based on quantities
- Prevents negative quantities
- Clean, commented JavaScript code
