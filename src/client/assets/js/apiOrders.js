import { base_url } from './consts.js';
import {call} from './consts.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const res = urlParams.get('res');

const $signSection = document.querySelector('.sign');
const $wishlist = document.querySelector('.wishlist');
const $personal = document.querySelector('.personal');
const $orders = document.querySelector('.orders');
const $ordersList = document.querySelector('.orders__list');
const $ordersTitle = document.querySelector('.titleO');

export const getOwnorders = async()=>{
  const orders = await call(`${base_url}/orders`, 'GET');
  console.log(orders.length)
  if(orders.name !== 'JsonWebTokenError'){
    createordersList(orders);
    return orders;
  }
  else{
    return;
  }
};
const createordersList = (orders) => {
  if(!res || res !== 'orders') {
    $orders.style.display = 'none';
    return;
  }
  $signSection.style.display ='none';
  $wishlist.style.display ='none';
  $personal.style.display ='none';
  $ordersTitle.innerText = 'My Orders';
  let str = '';
  orders.forEach((e)=>{
    const prices = e.products.map(e=>e.quantity * e.price).reduce(function (a, b) {
      return a+b;
    }, 0);
    console.log(prices)
    str+=`
    <div class='orders__list__item' href='http://127.0.0.1:5500/src/client/signUp_In.html?res=orders?id=${e.order_id}'>
      <div class='orders__list__item__text'>
          <p>${e.order_id}</p>
      </div>
      <div class='orders__list__item__text'>
          <p>${e.date.slice(0,10)}</p>
      </div>
      <div class='orders__list__item__text'>
        <p>€ ${prices}</p>
      </div>
      <div class='orders__list__item__text'>
        <p>${e.status}</p>
      </div>
    </div>    
    `;
    if($ordersList){
      $ordersList.innerHTML = str;
      
    }

    // if(orders.length === 0){
    //   if($orders){
    //     const noItems = document.createElement('div');
    //     noItems.innerText = 'No items found in orders history';
    //     noItems.classList.add('orders__noItems')
    //     $orders.appendChild(noItems)
    //   }
    // }
   
  })
}