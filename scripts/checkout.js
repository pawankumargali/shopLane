$(document).ready(function() {
    $('header').load('../includes/header.html');
    $('footer').load('../includes/footer.html');

    let order = JSON.parse(localStorage.getItem('order'));
    let itemCount=0;
    let totalAmt = 0;
    if(order) {
        for(const product of order.products) {
            const {name, qty, price, preview} = product;
            itemCount+=1;
            totalAmt+=Number(qty*price);
            const checkoutItem = createCheckoutItem(preview, name, qty, price);
            $('#checkout-items').append(checkoutItem);
        } 
    }
    $('#item-count').text(itemCount);
    $('#total-amt').text(totalAmt);

    const placedOrder = {products:order.products, bill:totalAmt};
    $('#place-order-btn').click(function() {
        $('#error-div').css('display', 'none');
        $.ajax({
            type: "POST",
            url:'https://5f0224d59e41230016d42bb5.mockapi.io/order/',
            data: JSON.stringify(placedOrder),
            success: function(res) {
                // console.log(res);
                localStorage.removeItem('order');
                window.location.href = './confirmation.html';
            },
            error: function() {
                $('#error-div').css('display','block');
            }
          });
    })
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