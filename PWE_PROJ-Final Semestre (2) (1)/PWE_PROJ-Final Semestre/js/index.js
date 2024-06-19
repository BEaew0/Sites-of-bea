// Função para abrir/fechar o menu

function toggleMenu() {
  var menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Evento para fechar o menu apenas quando clicado no botão "X" dentro do menu
document.addEventListener('click', function(event) {
  var menu = document.querySelector('.menu');
  var menuClose = document.querySelector('.menu-close');
  
  // Verifica se o clique ocorreu dentro do menu e no botão "X"
  if (event.target === menuClose) {
      menu.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const cart = [];
  const cartElement = document.querySelector('.cart');
  const products = document.querySelectorAll('.product');
  
  products.forEach(product => {
      product.querySelector('.add-to-cart').addEventListener('click', () => {
          const id = product.getAttribute('data-id');
          const name = product.getAttribute('data-name');
          const price = product.getAttribute('data-price');
          
          const item = cart.find(item => item.id === id);
          if (item) {
              item.quantity++;
          } else {
              cart.push({ id, name, price, quantity: 1 });
          }
          renderCart();
      });
  });

  function renderCart() {
      cartElement.innerHTML = '';
      cart.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.name} - R$ ${item.price} x ${item.quantity}`;
          cartElement.appendChild(li);
      });
  }
});

document.querySelector('.checkout').addEventListener('click', () => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'checkout.php';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'cart';
  input.value = JSON.stringify(cart);

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
});
