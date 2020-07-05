$(document).ready(function() {
    const order = JSON.parse(localStorage.getItem('order'));
    let count=0;
    if(order) {
     count=order.count;  
    }
    $('#order-count span').text(count);
});