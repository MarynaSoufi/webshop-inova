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
  },
  cacheElements(){
    this.$mainNavList = document.querySelector('.mainNav');
    this.$subNavList = document.querySelector('.subNav__list');
    this.$itemsSection = document.querySelector('.items');
    this.$listProductsById = document.querySelector('.items_list');
    this.$detail = document.querySelector('.detail_info');
    this.$hero = document.querySelector('.hero');
    this.$promo = document.querySelector('.promo');
    this.$price = document.querySelector('.price');
  },
  registerListeners(){
  },

  createSubNav(result){
    let str= '';
    if (this.$subNavList){
      result.forEach((e)=>{
        str+=`
        <a href="/src/client/index.html?categoryId=${e.category_id}&categoryName=${e.name}" id=${e.category_id} class="subNav__item__link">${e.name}</a>
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
    this.$itemsSection.classList.add('listGroup');
    this.$listProductsById.classList.add('listGroup__items');
    const data =await fetch(`${base_url}/categories/${category}/all_products`);
    const json =await data.json();
    this.result = json.products;
    this.createListProductsByCategory(this.result)
  }
  else{
    this.$itemsSection.classList.add('listHome');
    this.$listProductsById.classList.add('listHome__items');
    const data =await fetch(`${base_url}/products/promo`);
    const json =await data.json();
    this.result = json.products;
    this.createListProductsByCategory(this.result.slice(0,8))
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
          <p>${result.price}</p>
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
