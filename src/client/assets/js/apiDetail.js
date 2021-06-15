import { base_url } from './consts.js';
import { getWishList } from './apiWishlist.js';
import { getOwnCart } from './apiCart.js';
import { call } from './consts.js';
const $detail = document.querySelector('.detail__info');



/**
 * if user clicked on a specific product, here we fetch this product's data details
 */
  export const fetchItemDetail = async() => {
    

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('productId')
  const name = urlParams.get('prductName');
  if(product){
    document.title = `INOVA | Details | ${name}`
    const data =await fetch(`${base_url}/products/${product}`);
    const json =await data.json();
    const result = json.products;
    createProductDetail(result)
  }
};

/**
 * After getting data (product's details) this function creates elements of this product
 * @param {array} result
 */

const createProductDetail = async(result) => {
  const list = await getWishList();
  const ids = list.map(i => i.product_id);

  const listCart = await getOwnCart();
  const cartItems = listCart.map(i => i.product_id);

  let str= ``;
    if ($detail){
      const tag = result.tags;
      const tagItem = tag.map(t => `<li class='detail__info__desc__tags__tag'>${t.name}</li>`).join('')
      console.log(result)
      const reviews = result.reviews;
      const reviewItem = reviews.map(r => 
      `<li class='detail__info__reviews__list__item'>
        <strong>${r.firstName} ${r.LastName}</strong>
        <p>${r.description}</p>
      </li>`).join('')
      
        str=`
          <img src="./assets/images/${result.image}.jpg" alt="image ${result.name}" class = 'detail__info__img'/>
          <div class='detail__info__desc'>
            <div class='detail__info__desc__titleWrapper'>
              <p class='detail__info__desc__titleWrapper__title'>${result.name}</p>
              <div class='detail__info__desc__titleWrapper_btn'>
                <button type="button" class='btn btn--md ${ids.includes(result.product_id) ? 'delWish' : 'addWish'}'>${ids.includes(result.product_id) ? 'Remove from wishlist' : 'Add to wishlist'}</button>
              </div>
            </div>
            
            <p class='detail__info__desc__overview'>${result.description}</p>
            <ul class='detail__info__desc__tags'>${tagItem}</ul>
            <div class='detail__info__desc__priceWrapper'>
              <p class='detail__info__desc__price'>€${" " + result.price}</p>
              <div class='detail__info__desc__btn'>
                <button type="button" class=' btn btn--md ${!cartItems.includes(result.product_id) ? 'addToCart' : `${cartItems.includes(result.product_id) ? ' removeFromCart' : 'removeFromCart__hide'}`}'>${cartItems.includes(result.product_id) ? 'Remove from cart' : 'Add to cart'}</button>
              </div>
            </div>
          </div>
          <div class='detail__info__reviews'>
            <div class='detail__info__reviews__text'>
              <p class='detail__info__reviews__text__title'>Customers Reviews</p>
              <p class='detail__info__reviews__text__amount'>${reviews.length} ${reviews.length > 1 ? 'reviews' : 'review'}</p>
            </div>
            
            <ul class='detail__info__reviews__list'>${reviewItem}</ul>
          </div>
        `;
      $detail.innerHTML = str;
      
      
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const product = urlParams.get('productId');
      const $reviewerSection = document.querySelector('.js-reviewer');
      const permissions = await call(`${base_url}/users/products/${product}/permissions`, 'GET');      
      if(permissions && permissions.reviewable){
        if($reviewerSection){
          $reviewerSection.style.display ='block';
        } 
      } 

      const addwishBtn = document.querySelector('.addWish');
      if(addwishBtn){
        addwishBtn.addEventListener('click', async(e) =>{
          e.preventDefault();
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const product = urlParams.get('productId')
          console.log(product)
        
          
          await addToWishlist(product);
        });
      }
      const delwishBtn = document.querySelector('.delWish');
      if(delwishBtn){
        delwishBtn.addEventListener('click', async(e) =>{
          e.preventDefault();
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const product = urlParams.get('productId')
          console.log(product)
        
          await removeFromWishlist(product);
        });
      }
      
      const addToCart = document.querySelector('.addToCart');
      if(addToCart){
        addToCart.addEventListener('click', async(e) =>{
          e.preventDefault();
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const product = urlParams.get('productId')
          console.log(product)
        
          
          await addToMyCart(product);
        });
      }
      const removeFromCart = document.querySelector('.removeFromCart');
      if(removeFromCart){
        removeFromCart.addEventListener('click', async(e) =>{
          e.preventDefault();
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const product = urlParams.get('productId')
          console.log(product)
        
          
          await delFromMyCart(product);
        });
      }

      const sendReviewBtn = document.querySelector('.js-send');
      const reviewText = document.querySelector('.js-review');
      if(sendReviewBtn && reviewText){
        sendReviewBtn.addEventListener('click',async(e)=>{
          e.preventDefault();
          const review = {description:reviewText.value};
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const product = urlParams.get('productId')
          await sendReview(review, product);
        });
      }
      

  
    }
};

const addToWishlist = async(product) => {
  return await call(`${base_url}/wishlist/product/${product}`, 'POST', null);
};

const removeFromWishlist = async(product) => {
  return await call(`${base_url}/wishlist/product/${product}`, 'DELETE', null);
};

const addToMyCart = async(product) => {
  return await call(`${base_url}/cart/product/${product}`, 'POST');
};

const delFromMyCart = async(product) => {
  return await call(`${base_url}/cart/product/${product}`, 'DELETE', null);
};
const sendReview = async(review, product) => {
  const body = JSON.stringify(review);
  return await call(`${base_url}/reviews/product/${product}`, 'POST', body);
};

// const checkAllowReview = async ()=>{
 
//   console.log(orders);
// }