import { base_url } from './consts.js';
import { call } from './consts.js';
import {getProfile} from './apiPersonal.js';
const $cartList = document.querySelector('.cart__list');
const $cartTotal = document.querySelector('.cart__total__text');
const $payModal = document.querySelector('.js-pModal');
const $closePayModal = document.querySelector('.js-closeModal');
let res = '';

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
    return list;
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
    res = arrTotal.reduce((a, b) => a + b, 0);
    res = res.toFixed(2)
    $cartTotal.innerHTML = `<p>Subtotal:</p><p>€ ${res}</p>`
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
  const { firstName, LastName, mobileNumber, addressLine } = await getProfile();
  const result =  await call(`${base_url}/cart`, 'GET');
  const myCart = result.cart.products;
  const $namePayer = document.querySelector('.js-payNAme');
  const $numberPayer = document.querySelector('.js-payerNumber');
  const $addressPayer = document.querySelector('.js-payerAdderss');
  const $orderAmount = document.querySelector('.js-orderAmount');
  const $orderPrice = document.querySelector('.js-orderPrice');
  if(firstName || LastName){
    $namePayer.innerText = `${firstName} ${LastName}`
  }
  else{
    alert('Fill your personal information please');
    window.location.replace('http://127.0.0.1:5500/src/client/signUp_In.html?res=personal');
    return;
  }
  if(mobileNumber){
    $numberPayer.innerText = `${mobileNumber}`
  }
  else{
    alert('Fill your personal information please');
    window.location.replace('http://127.0.0.1:5500/src/client/signUp_In.html?res=personal');
    return;
  }
  if(addressLine){
    $addressPayer.innerText = `${addressLine}`
  }
  else{
    alert('Fill your personal information please');
    window.location.replace('http://127.0.0.1:5500/src/client/signUp_In.html?res=personal');
    return;
  }
  $orderAmount.innerText= myCart.length;
  $orderPrice.innerText= `€ ${res}`;
  $closePayModal.addEventListener('click', ()=>{
    $payModal.style.display = 'none'
  })
  
} 

const $nextBtn = document.querySelector('.js-next');
const $processModal = document.querySelector('.js-process');
const $processModalText = document.querySelector('.js-processText');
if($nextBtn) {
  $nextBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    $payModal.style.display = 'none'
    $processModal.style.display = 'block';
    setTimeout(async () => {
      $processModalText.innerText= 'Paid Successfully!'
      setTimeout(async () => {
        await call(`${base_url}/orders`, 'POST', null);
        $processModal.style.display = 'none';
      }, 2500);
    }, 3500);

  })
}