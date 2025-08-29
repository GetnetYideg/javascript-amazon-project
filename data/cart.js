export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart =  [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            productQuantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            productQuantity: 2,
            deliveryOptionId: '2'
        }
        ];
}
function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId, value){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId == item.productId){
            matchingItem = item;
        }
    });
    if(matchingItem){
        matchingItem.productQuantity += Number(value);
    }
    else{
        cart.push({
            productId: productId,
            productQuantity: Number(value),
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}
export function removeFromCart(productId){
    let newCart = [];
    cart.forEach((cartItem) =>{
        if(productId !== cartItem.productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}
export function updateCart(){
    cart.forEach(cartItem=>{
        document.querySelector(`.js-update-link-${cartItem.productId}`).addEventListener('click', ()=>{
            document.querySelector(`.js-update-link-${cartItem.productId}`).innerHtml = `
                <input class = "update-input" type = "text" height = "50px" width = "100px">
            `
        })
    })
}
export function updateDeliveryOption(productId, deliveryId){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId == item.productId){
            matchingItem = item;
        }
    });
    matchingItem.deliveryOptionId = deliveryId;

    saveToStorage();
}