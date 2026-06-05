document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('shop-button');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    window.location.href = 'product.html';
  });
});
