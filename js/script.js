document.addEventListener('DOMContentLoaded', () => {
  const totalEl = document.querySelector('.total');

  function parsePrice(text) {
    return parseFloat(text) || 0;
  }

  function updateTotal() {
    const cards = document.querySelectorAll('.list-products .card');
    let total = 0;
    cards.forEach((card) => {
      const price = parsePrice(card.querySelector('.unit-price').textContent);
      const qty = parseInt(card.querySelector('.quantity').textContent) || 0;
      total += price * qty;
    });
    totalEl.textContent = ` ${total} $ `;
  }

  // Attach handlers to each product card
  function attachHandlers() {
    const cards = document.querySelectorAll('.list-products .card');
    cards.forEach((card) => {
      const plus = card.querySelector('.fa-plus-circle');
      const minus = card.querySelector('.fa-minus-circle');
      const qtySpan = card.querySelector('.quantity');
      const deleteBtn = card.querySelector('.fa-trash-alt');
      const heart = card.querySelector('.fa-heart');

      if (plus) {
        plus.addEventListener('click', () => {
          qtySpan.textContent = parseInt(qtySpan.textContent || '0') + 1;
          updateTotal();
        });
      }

      if (minus) {
        minus.addEventListener('click', () => {
          const current = parseInt(qtySpan.textContent || '0');
          if (current > 0) {
            qtySpan.textContent = current - 1;
            updateTotal();
          }
        });
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          // remove the outer wrapper that holds this card
          const outer = card.parentElement; // matches the product wrapper
          if (outer) outer.remove();
          updateTotal();
        });
      }

      if (heart) {
        heart.style.transition = 'color 150ms';
        heart.addEventListener('click', () => {
          const liked = heart.classList.toggle('liked');
          heart.style.color = liked ? 'red' : 'black';
        });
      }
    });
  }

  attachHandlers();
  updateTotal();
});
