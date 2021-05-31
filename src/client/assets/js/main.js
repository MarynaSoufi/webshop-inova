// IMPORTS START -->

import { base_url } from './consts.js';

// <-- IMPORTS END

const app = {
  async init() {
    this.cacheElements();
    this.registerListeners();
    this.fetchCats(); 
    this.fetchItems();
    this.fetchItemDetail(); 
    this.picsBorder();
 
  },
  cacheElements(){
    this.$mainNavList = document.querySelector('.mainNav');
    this.$subNavList = document.querySelector('.subNav__list');
    this.$subNavListItems = document.querySelectorAll('.subNav__item__link')
    this.$itemsSection = document.querySelector('.items');
    this.$listProductsById = document.querySelector('.items_list');
    this.$detail = document.querySelector('.detail_info');
    this.$hero = document.querySelector('.hero');
    this.$promo = document.querySelector('.promo');
    this.$price = document.querySelector('.price');
    this.$insta = document.querySelector('.insta');
    this.$instaPics = document.querySelectorAll('.pic');
    this.$splashContainer = document.querySelector('#splash');
    this.$openAc = document.querySelector('.ac');
    this.$closeAc = document.querySelector('.account__modal__top__close');
    this.$ac = document.querySelector('.account__modal');
    this.$log = document.querySelectorAll('.log');
    this.$unlog = document.querySelector('.unlog');

      this.$loginBtn = document.querySelector('.js-login');
      this.$createBtn = document.querySelector('.js-create');
    
    
      this.$logInInputEmail = document.querySelector('.email-log');
      this.$logInInputpass = document.querySelector('.password-log');
    
  },
  registerListeners(){
    let log = false;
    this.$openAc.addEventListener('click',()=>{
        this.$ac.style.display = 'flex';
        if(log){
          
          this.$unlog.style.display = 'none';
          this.$log.forEach((e)=>{
            e.style.display = 'block';
          })
          
        }else{
          this.$log.forEach((e)=>{
            e.style.display = 'none';
          })
          this.$unlog.style.display = 'block';
          this.$unlog.style.borderBottom = 'none';
          this.$unlog.style.marginBottom = '0';
          this.$unlog.style.paddingBottom = '0';
          this.$closeAc.style.marginBottom = '.5rem';
          this.$closeAc.style.marginLeft = '16rem';
          
        }
    })
    this.$closeAc.addEventListener('click',()=>{
      this.$ac.style.display = 'none';
    })

    // this.$createBtn.addEventListener('click', () => {

    // });
    if(this.$loginBtn){
      this.$loginBtn.addEventListener('click', async() => {
        const email = this.$logInInputEmail.value;
        const password = this.$logInInputpass.value;
        this.requestInfo = { email: email, password: password };
        await this.logIn(this.requestInfo);
  
      });
    }

    // if(this.$loginBtn){
    //   this.$loginBtn.addEventListener('click',(e)=>{
    //     e.preventDefault();
    //     console.log(this.$logInInputEmail.value);
    //     console.log(this.$logInInputpass.value);
    //   })
    // }
   
  },

  picsBorder() {
    this.$instaPics.forEach((p, index)=>{
      if(index % 2 === 0){
        p.classList.add('border');
      }
    });
  },
  createSubNav(result){
    let str= '';
    if (this.$subNavList){
      result.forEach((e)=>{
        str+=`
        <a href="/src/client/index.html?categoryId=${e.category_id}&categoryName=${e.name}" id=${e.category_id} class="subNav__item__link" >${e.name}</a>
        `;
      });
      this.$subNavList.innerHTML = str;
    }
  },
 
  async fetchCats () {
  const data =await fetch(`${base_url}/categories`);
  const json =await data.json();
  this.result = json.categories;
  this.createSubNav(this.result)
},

async fetchItems() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const category = urlParams.get('categoryId');
  const name = urlParams.get('categoryName');
  if(category) {
    document.title = `INOVA | ${name}`;
    this.$hero.style.display = 'none'
    this.$promo.style.display = 'none'
    this.$insta.style.display = 'none'
    this.$itemsSection.classList.add('listGroup');
    this.$listProductsById.classList.add('listGroup__items');
    const data =await fetch(`${base_url}/categories/${category}/all_products`);
    const json =await data.json();
    this.result = json.products;
    this.createListProductsByCategory(this.result)
  }
  else{
    if(this.$itemsSection && this.$listProductsById){
      this.$itemsSection.classList.add('listHome');
      this.$listProductsById.classList.add('listHome__items');
      const data =await fetch(`${base_url}/products/promo`);
      const json =await data.json();
      this.result = json.products;
      this.createListProductsByCategory(this.result.slice(0,8))
    }
    
    
    
  }
  
},

createListProductsByCategory(result) {
  let str= '';
    if (this.$listProductsById){
      result.forEach((e)=>{
        str+=`
        <a href = '/src/client/detail.html?productId=${e.product_id}&prductName=${e.name}'>
          <img src="./assets/images/${e.image}.jpg" alt="image ${e.name}" class = 'image image--list'/>
          <strong>${e.name}</strong>
          <div class='price'>
            <p class='price__amount'>€${e.price}</p>
            <p class='price__disc'>${e.promo_id > 0 ? '(you save €' + `${Math.round(e.price * 0.1)}.00)` : ''}</p>
          </div>
         
        </a>
        `;
        
      });

      this.$listProductsById.innerHTML = str;

    }
},
async fetchItemDetail() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('productId')
  const name = urlParams.get('prductName');
  if(product){
    document.title = `INOVA | Details | ${name}`
    const data =await fetch(`${base_url}/products/${product}`);
    const json =await data.json();
    this.result = json.products;
    this.createProductDetail(this.result)
  }
},
// async signUp(info){
//   const data =await fetch(`${base_url}/auth/register`, { body: info, method: 'POST'});
//   const json =await data.json();
//   return json;
// },
async logIn(requestInfo){
  const data =await fetch(`${base_url}/auth/login`, { body: JSON.stringify(requestInfo), method: 'POST'});
  const json =await data.json();
  window.localStorage.setItem('token', json.token);
},

// async logOut(){
//   window.localStorage.removeItem('token');
// },
// async getCart() {
//   return await call(`${base_url}/cart`, 'GET');
// },
// async addToCart(productId) {
//   const body = { productId: productId};
//   return await call(`${base_url}/cart/products`, 'POST', body);
// },
// async call(url, method, body){
//   const token = window.localStorage.getItem('token');
//   const options = { method: method, headers: { 'Authorization': `Bearer ${token}`}};
//   if(body) {
//     options.body = body;
//   }
//   const data =await fetch(url, options);
//   const json =await data.json();
//   return json;
// },
createProductDetail(result) {
  let str= ``;
    if (this.$detail){
      const tag = result.tags;
      const tagItem = tag.map(t => `<li>${t.name}</li>`).join('')

      const reviews = result.reviews;
      const reviewItem = reviews.map(r => 
      `<li>
        <strong>${r.user_id}</strong>
        <p>${r.description}</p>
      </li>`).join('')
      
        str=`
          <img src="./assets/images/${result.image}.jpg" alt="image ${result.name}" class = 'image image--detail'/>
          <div>${result.name}</div>
          <p>€${result.price}</p>
          <p>${result.description}</p>
          <ul>${tagItem}</ul>
          <p>Reviews: ${reviews.length}</p>
          <ul>${reviewItem}</ul>

        `;

      this.$detail.innerHTML = str;

    }
}
}
// start the app
app.init();
