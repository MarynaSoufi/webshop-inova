import { base_url } from './consts.js';
import {call} from './consts.js';

const $orders = document.querySelector('.orders');
const $ordersList = document.querySelector('.orders__items');
const $ordersTitle = document.querySelector('.titleO');

export const getOwnorders = async()=>{
  const orders = await call(`${base_url}/orders`, 'GET');
  console.log(orders)
  if(orders.name !== 'JsonWebTokenError'){
    createordersList(orders);
    return orders;
  }
  else{
    return;
  }
};
const createordersList = (orders) => {
  let str = '';
  orders.forEach((e)=>{
    const products = e.products;
    console.log(products)
    const q = products.quantity;
    const p = products.price;
    const t = q * p;
    str+=`
      
    <div class='order__list__item'>
      <div class='order__list__item__id'>
          <p>${e.order_id}</p>
      </div>
      <div class='order__list__item__date'>
          <p>${e.date}</p>
      </div>
       
        <div class='cart__list__item__price'>
        
          <p class='cart__list__item__price__total'>${e.quantity * e.price}</p>
          <button type="button" value=${e.product_id} class='cart__list__item__price__delete delItemFromCart'>X</button>
        </div>
      
    </div>
    
    
    `;
  })
}
// const createWishList = (list)=>{
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const res = urlParams.get('res');
//   const $signSection = document.querySelector('.sign');
//   const $personal = document.querySelector('.personal');
//   const $wishlist = document.querySelector('.wishlist');
//   const $wishTitle = document.querySelector('.titleW');
//   if(res && res == 'favorites'){
//     $signSection.style.display ='none';
//     $personal.style.display = 'none';
    
//     let str= '';
//     if ($wishlist){
//       list.forEach((e)=>{
//         str+=`
//         <a href ='/src/client/detail.html?productId=${e.product_id}&prductName=${e.name}'>
//           <img src="./assets/images/${e.image}.jpg" alt="image ${e.name}" class = 'image image--list'/>
//           <strong>${e.name}</strong>
//           <div class='price'>
//             <p class='price__amount'>€${e.price}</p>
//             <p class='price__disc'>${e.promo_id > 0 ? '(you save €' + `${Math.round(e.price * 0.1)}.00)` : ''}</p>
//           </div>
//         </a>
//         `;
//       });
//       $wishlistItems.innerHTML = str;
//       $wishTitle.innerText = 'My wish list'
//     }
//   }
//     else if(res && res!='favorites'){

//       $wish.style.display = 'none';
//     }
// };
