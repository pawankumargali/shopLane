const API_ENDPOINT = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product';

const clothingCardContainer = document.getElementById('clothing-card-container');
const accessoryCardContainer = document.getElementById('accessory-card-container');

$(document).ready(function() {
    $('header').load('./includes/header.html');
    $('footer').load('./includes/footer.html');

    $.get(API_ENDPOINT)
        .then(products => {
            for(const product of products) {
                console.log(product);
                const { id, brand, name, preview, price, isAccessory } = product;
                const productCard = createProductCard(id, preview, name, brand, price);
                if(isAccessory) 
                    accessoryCardContainer.appendChild(productCard);
                else
                    clothingCardContainer.appendChild(productCard);
            }

            const productImgs = document.getElementsByClassName('product-img');
            for(const productImg of productImgs) {
                productImg.addEventListener('click', () => window.location.href=`./pages/details.html?p=${productImg.id}`);
            }
        })
        .catch(err => console.log(err));

});

function createProductCard(id, imgLink, title, brand, price) {

    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productImg = document.createElement('img');
    productImg.className='product-img';
    productImg.id=id;
    productImg.src= imgLink;

    const productDesc = document.createElement('div');
    productDesc.classList.add('product-meta');

    const productTitle = document.createElement('h4');
    const titleText = document.createTextNode(title);
    productTitle.appendChild(titleText);

    const productBrand = document.createElement('h5');
    const brandName = document.createTextNode(brand);
    productBrand.appendChild(brandName);

    const productPrice = document.createElement('p');
    const priceAmt = document.createTextNode(price);
    productPrice.appendChild(priceAmt);

    productDesc.appendChild(productTitle);
    productDesc.appendChild(productBrand);   
    productDesc.appendChild(productPrice);   

    productDiv.appendChild(productImg);
    productDiv.appendChild(productDesc);

    return productDiv;

}