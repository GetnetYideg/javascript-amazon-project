export const cart = [];
export function addToCart(productId){
    let matchingItem, addIndex;
    cart.forEach((item, index)=>{
        if(productId == item.productId){
            matchingItem = item;
        }
    });
    if(matchingItem){
        matchingItem.productQuantity += 1;
    }
    else{
        cart.push({
            productId: productId,
            productQuantity: 1
        });
    }
}