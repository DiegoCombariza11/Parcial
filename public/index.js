fetch('/products')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('product-select');
        data.forEach(product => {
            const option = document.createElement('option');
            option.value = product.code;
            option.text = product.description;
            select.add(option);
        });
    });

document.getElementById('product-select').addEventListener('change', function() {
    const selectedProductCode = this.value;
    fetch(`/products/${selectedProductCode}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('stock').value = product.stock;
            document.getElementById('value').value = product.value;
            document.getElementById('stock-min').value = product['stock-min'];
        });
});

let productsInSale = [];
let cart = [];

function addProductToSale(productString) {
    let product = JSON.parse(productString);

    if (product.stock > 0) {
        productsInSale.push(product);
        cart.push(product);
        product.stock--;
        updateSaleProducts();
        updateTotal();
        updateCart();
    } else {
        alert('No hay stock para este producto');
    }
}

function updateSaleProducts() {
    let saleProductsDiv = document.getElementById('saleProducts');
    saleProductsDiv.innerHTML = '';
    productsInSale.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.textContent = product.description;
        saleProductsDiv.appendChild(productDiv);
    });
}

function updateTotal() {
    let total = productsInSale.reduce((sum, product) => sum + product.value, 0);
    document.getElementById('total').textContent = total;
}

function updateCart() {
    let cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    cart.forEach(product => {
        let productElement = document.createElement('p');
        productElement.textContent = `Producto: ${product.description}, Valor: ${product.value}`;
        cartElement.appendChild(productElement);
    });
}

document.getElementById('checkout-button').addEventListener('click', function() {
   localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = '/checkout';
});