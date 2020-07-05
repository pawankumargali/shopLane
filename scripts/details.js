const API_ENDPOINT = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product';

$(document).ready(function() {
    // Load header and footer
    $('header').load('../includes/header.html');
    $('footer').load('../includes/footer.html');

    // get product id from query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('p');

    // get product details
    $.get(`${API_ENDPOINT}/${productId}`)
        .then(product => {

           const {id, name, brand, description, photos, preview, price } = product;
           addProductInfo(preview, name, brand, price, description, photos);

           // show active preview image on click
            const previewImgs = $('#preview-imgs-div img');
            const productImg = $('#product-img');
            previewImgs.click(function(){
                for(const previewImg of previewImgs) {
                    previewImg.style.border='none';
                }
                this.style.border = 'solid 2px #009688';
                productImg.attr('src', this.src);
            });

            //add event listener => adds product to cart on click of addToCart button
            const addToCartBtn = $('#add-to-cart-btn');
            addToCartBtn.click(function() {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => this.style.transform='', 200);
                addToCart(id, name, price, preview);
            });
        })
        .catch(err => console.log(err));
});


function addProductInfo( imgLink, name, brand, price, description, photos) {
    $('#product-img').attr('src', imgLink);
    $('#title').text(name);
    $('#brand').text(brand);
    $('#price span').text(price);
    $('#desc').text(description);
    for(const photo of photos) {
        $('#preview-imgs-div').append($('<img>').attr('src', photo));
    }
}

function addToCart(id, name, price, preview) {
    const order = JSON.parse(localStorage.getItem('order'));
    if(order) {
        for(const prevProduct of order.products) {
            if(prevProduct.id===id) {
                prevProduct.qty+=1;
                order.count+=1;
                $('#order-count span').text(order.count);
                localStorage.setItem('order', JSON.stringify(order));
                return;
            }
        }
        const product = {id, name, qty:1, price, preview};
        order.products.push(product);
        order.count+=1;
        $('#order-count span').text(order.count);
        localStorage.setItem('order', JSON.stringify(order));
    }
    else {
        const newOrder = {products:[], count:0};
        const product = {id, name, qty:1, price, preview};
        newOrder.products.push(product);
        newOrder.count=1;
        $('#order-count span').text(newOrder.count);
        localStorage.setItem('order', JSON.stringify(newOrder));
    }
}