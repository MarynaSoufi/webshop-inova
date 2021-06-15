import { base_url } from './consts.js';
import {call} from './consts.js';

const $wishlistItems = document.querySelector('.wishlist__items');
const $wish = document.querySelector('.wishlist')

export const getWishList = async()=>{
  const result =  await call(`${base_url}/wishlist`, 'GET');
  const list = result.products
  if(result.name !== 'JsonWebTokenError'){
    createWishList(list);
    return list;
  }
  else{
    return;
  }
};

const createWishList = (list)=>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const res = urlParams.get('res');
  const $signSection = document.querySelector('.sign');
  const $personal = document.querySelector('.personal');
  const $wishlist = document.querySelector('.wishlist');
  const $wishTitle = document.querySelector('.titleW');
  if(res && res == 'favorites'){
    $signSection.style.display ='none';
    $personal.style.display = 'none';
    
    let str= '';
    if ($wishlist){
      list.forEach((e)=>{
        str+=`
        <a href ='/src/client/detail.html?productId=${e.product_id}&prductName=${e.name}'>
          <img src="./assets/images/${e.image}.jpg" alt="image ${e.name}" class = 'image image--list'/>
          <strong>${e.name}</strong>
          <div class='price'>
            <p class='price__amount'>€${e.price}</p>
            <p class='price__disc'>${e.promo_id > 0 ? '(you save €' + `${Math.round(e.price * 0.1)}.00)` : ''}</p>
          </div>
        </a>
        `;
      });
      $wishlistItems.innerHTML = str;
      $wishTitle.innerText = 'My wish list'
    }
  }
    else if(res && res!='favorites'){

      $wish.style.display = 'none';
    }
};
