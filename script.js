document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('shop-button');
  if (button) {
    button.addEventListener('click', () => {
      window.location.href = 'product.html';
    });
  }

  const button1 = document.getElementById('shop-button1');
  if (button1) {
    button1.addEventListener('click', () => {
      window.location.href = 'lessons.html';
    });
  }
});
