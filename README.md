# Shopping Cart - DOM Project 1

A fully functional shopping cart interface built with vanilla JavaScript, HTML, and CSS. This checkpoint demonstrates DOM manipulation, event handling, and dynamic price calculations.

## 📋 Overview

This project recreates a shopping cart where users can manage pre-selected items. The cart supports quantity adjustments, item deletion, and a wishlist feature with real-time total price updates.

**Deadline:** 17.05.2026

## ✨ Features

- **Quantity Management:** Increase or decrease item quantities using +/- buttons
- **Item Deletion:** Remove items from the cart with a single click
- **Wishlist/Like Feature:** Toggle favorite items with a clickable heart button that changes color
- **Dynamic Total:** Real-time calculation of total price based on quantities and deletions
- **Responsive Design:** Built with Bootstrap 5 for mobile and desktop compatibility

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling
- **Vanilla JavaScript** - DOM events and manipulation
- **Bootstrap 5** - UI framework
- **Font Awesome 6** - Icon toolkit (plus, minus, heart, trash icons)

## 📁 Project Structure

```
cp-Shopping-Card/
├── index.html           # Main HTML file with product cards
├── js/
│   └── script.js        # DOM event handlers and cart logic
├── style/
│   └── style.css        # Custom styling
├── assets/              # Product images
│   ├── baskets.png
│   ├── socks.png
│   └── bag.png
└── README.md            # This file
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cp-Shopping-Card
```

2. Open `index.html` in your web browser or serve it locally:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. Navigate to `http://localhost:8000` (or your server URL)

## 📖 How to Use

1. **Add Items:** Click the **+** icon to increase the quantity of any item
2. **Remove Items:** Click the **−** icon to decrease quantity (cannot go below 0)
3. **Delete from Cart:** Click the **trash icon** to remove an item entirely
4. **Like Items:** Click the **heart icon** to toggle the wishlist (turns red when liked)
5. **Check Total:** The total price updates automatically at the top

## 💡 Key Implementation Details

### DOM Event Handling
- Event listeners attached to +/−/trash/heart icons
- Real-time DOM updates for quantity and total price
- Prevents negative quantities

### Price Calculation
- Calculates total by summing: `quantity × unit_price` for each item
- Updates dynamically on every quantity change or deletion

### Code Quality
- Well-commented JavaScript for maintainability
- Clean separation of concerns (HTML structure, CSS styling, JS logic)
- Responsive and accessible UI

## 🎯 Evaluation Criteria

This project demonstrates:
- ✅ Effective use of external frameworks (Bootstrap, Font Awesome)
- ✅ Clear code comments for readability
- ✅ Clean, functional design
- ✅ Efficient problem-solving with vanilla JavaScript
- ✅ Meeting project deadline

## 📝 License

This is a checkpoint project for educational purposes.
