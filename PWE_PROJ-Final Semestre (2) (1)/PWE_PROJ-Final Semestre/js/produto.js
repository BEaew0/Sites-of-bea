// Array para armazenar os produtos na cesta
const cart = [];

// Elemento da cesta onde os itens serão exibidos
const cartElement = document.querySelector('.cart');

// Seleciona todos os botões "Adicionar à Cesta"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Adiciona um evento de clique a cada botão "Adicionar à Cesta"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtém os dados do produto do atributo "data-*"
        const id = button.parentElement.getAttribute('data-id');
        const name = button.parentElement.getAttribute('data-name');
        const price = button.parentElement.getAttribute('data-price');
        
        // Verifica se o produto já está na cesta
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++; // Incrementa a quantidade se o produto já está na cesta
        } else {
            cart.push({ id, name, price, quantity: 1 }); // Adiciona o produto à cesta
        }
        
        // Atualiza a visualização da cesta
        renderCart();
    });
});

// Função para renderizar os itens da cesta
function renderCart() {
    cartElement.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price} x ${item.quantity}`;
        cartElement.appendChild(li);
    });
}

// Evento de clique para finalizar a compra
document.querySelector('.checkout').addEventListener('click', () => {
    // Cria um formulário dinâmico para enviar os dados da cesta via POST
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'checkout.php'; // Arquivo PHP para processar a finalização da compra

    // Cria um input hidden para enviar o JSON da cesta
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'cart';
    input.value = JSON.stringify(cart);

    // Adiciona o input ao formulário e o formulário ao corpo do documento
    form.appendChild(input);
    document.body.appendChild(form);

    // Submete o formulário
    form.submit();
});
