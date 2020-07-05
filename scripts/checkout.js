$(document).ready(function() {
    $('header').load('../includes/header.html');
    $('footer').load('../includes/footer.html');

    let order = JSON.parse(localStorage.getItem('order'));
    if(order) {
        const productCount = 0;
        for(const product of order.products) {
            const {name, qty, price, preview} = product;
            const checkoutItem = createCheckoutItem(preview, name, qty, price);
            $('#checkout-items').append(checkoutItem);
            productCount++;
        }
        $('#item-count').text(productCount);
    }
    else {
        $('#item-count').text(0);
    }
    
});


function createCheckoutItem(imgLink, name, qty, price) {
    const checkoutItem = document.createElement('div');
    checkoutItem.classList.add('checkout-item');

    const imgDiv = document.createElement('div');
    const imgElt = document.createElement('img');
    imgElt.classList.add('product-img');
    imgElt.src= imgLink;
    imgDiv.appendChild(imgElt);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('product-info');

    const productNameElt = document.createElement('h4');
    productNameElt.classList.add('product-name');
    const productName = document.createTextNode(name);
    productNameElt.appendChild(productName);

    const qtyElt = document.createElement('p');
    const quantity = document.createTextNode('x'+qty);
    qtyElt.appendChild(quantity);

    const amtElt = document.createElement('p');
    const amt = document.createTextNode('Amount: Rs '+price*qty);
    amtElt.appendChild(amt);

    infoDiv.appendChild(productNameElt);
    infoDiv.appendChild(qtyElt);
    infoDiv.appendChild(amtElt);

    checkoutItem.appendChild(imgDiv);
    checkoutItem.appendChild(infoDiv);

    return checkoutItem;
}