import { base_url } from './consts.js';
import { call } from './consts.js';
import {getProfile} from './apiPersonal.js';
const $cartList = document.querySelector('.cart__list');
const $cartTotal = document.querySelector('.cart__total__text');
const $payModal = document.querySelector('.js-pModal');
const $closePayModal = document.querySelector('.js-closeModal');

/**
 * user gets own cart
 */
 export const getOwnCart = async()=>{
  const result =  await call(`${base_url}/cart`, 'GET');
  console.log(result);
  const list = result.cart.products;
  
  if(result.name !== 'JsonWebTokenError'){
    
    createCartSection(list);
    return list;
  }
  else{
    return;
  }
};

const createCartSection = (list)=>{
  
  const cartItems = list.map(i => i.product_id);
  let str = '';
  if($cartList){
    
    console.log(list)
    list.forEach((e)=>{
      str+=`
      
      <div class='cart__list__item'>
        <a href = '/src/client/detail.html?productId=${e.product_id}&prductName=${e.name}' class='cart__list__item__link'>
          <div class='cart__list__item__link__img'>
            <img src="./assets/images/${e.image}.jpg" alt="image ${e.name}" />
            <p>${e.name}</p>
          </div>
        </a>
          <div class='cart__list__item__quantity'>
          <button type="button" value=${e.product_id} class=${cartItems.includes(e.product_id) ? 'removeFromCart' : 'removeFromCart__hide'}>-</button>
          <p class='price__disc'>${e.quantity}</p>
          <button type="button" class='addToCart' value=${e.product_id}>+</button>
         
          </div>
          <div class='cart__list__item__price'>
          
            <p class='cart__list__item__price__total'>${e.quantity * e.price}</p>
            <button type="button" value=${e.product_id} class='cart__list__item__price__delete delItemFromCart'>X</button>
          </div>
        
      </div>
      
      
      `;
    });
    $cartList.innerHTML += str;
    const total = document.querySelectorAll('.cart__list__item__price__total');
    const arrTotal = [];
    total.forEach((e)=>{
      arrTotal.push(parseFloat(e.innerHTML));
    })
    const res = arrTotal.reduce((a, b) => a + b, 0);
    $cartTotal.innerHTML = `<p>Subtotal:</p><p>€ ${Math.round(res)}</p>`
  }

  const addToCart = document.querySelectorAll('.addToCart');
      if(addToCart){
        addToCart.forEach((e)=>{
          e.addEventListener('click', async(e) =>{
            e.preventDefault();
            let product = e.target.value
            console.log(product)
            await addToMyCart(product)
            
           
          })
        })
        
      }
  const removeFromCart = document.querySelectorAll('.removeFromCart');
  if(removeFromCart){
    removeFromCart.forEach((e)=>{
      e.addEventListener('click', async(e) =>{
        e.preventDefault();
        let product = e.target.value
        console.log(product)
        await delFromMyCart(product)
        
        
      })
    })
  }

  const delItemFromCart = document.querySelectorAll('.delItemFromCart');
  if(removeFromCart){
    delItemFromCart.forEach((e)=>{
      e.addEventListener('click', async(e) =>{
        e.preventDefault();
        let product = e.target.value
        console.log(product)
        await delAllItemFromMyCart(product)
        
        
      })
    })
  }

  const paypalBtn = document.querySelector('.js-payBtnP');
  if(paypalBtn){
    paypalBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log('Paypal')
      createModalPay();
      $payModal.style.display = 'block';
    })
  }

  const bancontactBtn = document.querySelector('.js-payBtnB');
  if(bancontactBtn){
  bancontactBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('Bancontact');
    createModalPay();
    $payModal.style.display = 'block';
  })
}
      
};


    



const addToMyCart = async(product) => {
  return await call(`${base_url}/cart/product/${product}`, 'POST', null);
};

const delFromMyCart = async(product) => {
  return await call(`${base_url}/cart/min/product/${product}`, 'PUT', null);
};
const delAllItemFromMyCart = async(product) => {
  return await call(`${base_url}/cart/product/${product}`, 'DELETE', null);
};

const createModalPay = async () =>{
  const profile = await getProfile();
  console.log(profile);
  $closePayModal.addEventListener('click', ()=>{
    
    $payModal.style.display = 'none'
  })
  
}