// IMPORTS START -->

import { base_url } from './consts.js';

// <-- IMPORTS END

const app = {

  /**
   * Initialize the application
   */

  async init() {
    this.cacheElements();
    this.registerListeners();
    this.fetchCats(); 
    this.fetchItems();
    this.fetchItemDetail(); 
    this.picsBorder();
    this.getProfile();

  },

  /**
   * Get the nedded elements from dom
   */

  cacheElements(){
    //Headr elements

    this.$mainNavList = document.querySelector('.mainNav');
    this.$subNavList = document.querySelector('.subNav__list');
    this.$subNavListItems = document.querySelectorAll('.subNav__item__link');

    this.$openAc = document.querySelectorAll('.ac');
    this.$closeAc = document.querySelector('.account__modal__top__close');
    this.$ac = document.querySelector('.account__modal');
    this.$log = document.querySelectorAll('.log');
    this.$unlog = document.querySelector('.unlog');
    this.$logOut = document.querySelectorAll('.logOut');

    //Homepage elements

    this.$itemsSection = document.querySelector('.items');
    this.$hero = document.querySelector('.hero');
    this.$promo = document.querySelector('.promo');
    this.$insta = document.querySelector('.insta');
    this.$instaPics = document.querySelectorAll('.pic');

    //Homepage elements with category

    this.$listProductsById = document.querySelector('.items_list');

    //detail page elements

    this.$detail = document.querySelector('.detail_info');



    //SignUp_in page elements

    this.$loginBtn = document.querySelector('.js-login');
    this.$logInInputEmail = document.querySelector('.email-log');
    this.$logInInputpass = document.querySelector('.password-log');

    this.$createBtn = document.querySelector('.js-create');
    this.$signUpEmail = document.querySelector('.email-signUp');
    this.$signUppass = document.querySelector('.pass-signUp');


    
  },

  /**
   * All eventListeners here
   */

  registerListeners(){

    // close and open modal account

    this.$openAc.forEach((e)=>{
      e.addEventListener('click',()=>{
        this.$ac.style.display = 'flex';

        //check if if user logged in 

        if(this.isAuthenticated()){
          
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
    })
    this.$closeAc.addEventListener('click',()=>{
      this.$ac.style.display = 'none';
    })

    // login button on signUp_in page

    if(!this.$loginBtn){
      return; }
    this.$loginBtn.addEventListener('click', async(e) => {
      e.preventDefault();
      const email = this.$logInInputEmail.value;
      const password = this.$logInInputpass.value;
      this.requestInfo = { email: email, password: password };
      await this.logIn(this.requestInfo);
      console.log('in')
      
    });
    
    //logOut button 

    this.$logOut.forEach((e)=>{
      if(this.isAuthenticated()) {
        e.addEventListener('click', async(e) => {
          e.preventDefault();
          console.log('p')
          await this.logOut();
          this.$ac.style.display = 'none';
          
        });
      }
    })
    


    // Register/Create account button on signUp_in page

    if(!this.$createBtn) {
      return;
    }
    this.$createBtn.addEventListener('click', async(e) => {
      e.preventDefault();
      const email = this.$signUpEmail.value;
      const password = this.$signUppass.value;
      this.info = { email: email, password: password };
      await this.signUp(this.info);
      console.log('created')
      window.location.href = "http://127.0.0.1:5500/src/client/index.html";
    });
  },

  /**
   * Check if there is loggened user
   */
  isAuthenticated() {
    return !!window.localStorage.getItem('token');
  },

  /**
   * get all the ictures in insta section on homepage and add border by index
   */
  picsBorder() {
    this.$instaPics.forEach((p, index)=>{
      if(index % 2 === 0){
        p.classList.add('border');
      }
    });
  },

  /**
   * get all categories from db 
   */

  async fetchCats () {
    const data =await fetch(`${base_url}/categories`);
    const json =await data.json();
    this.result = json.categories;

    //with this data create subnav menu for categories

    this.createSubNav(this.result)
  },



  /**
   * After getting data (all categories) this function creates elements in header
   * @param {array} result
   */

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

  /**
   *get promo products if it's homepage without specific category
   *get all products of category if on homepage chosen this category
   */
  async fetchItems() {
    //get url params to check if user choosed a category
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('categoryId');
    const name = urlParams.get('categoryName');

    //if user choosed a category so we change the layout of the home page

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
    //if user didnt choose any category so we create the layout of the home page
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

  /**
   * After getting data (needed products) this function creates a list of nedded products
   * @param {array} result
   */
  
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

  /**
   * if user clicked on a specific product, here we fetch this product's data details
   */
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

  /**
   * After getting data (product's details) this function creates elements of this product
   * @param {array} result
   */

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
  },

  /**
   * here new user register him self after filling the registering form 
   * and pressing on create account button 
   * we get the data as param
   * @param {string} info
   * and post them to db table users
   */

  async signUp(info){
    const data =await fetch(`${base_url}/users`, { body: JSON.stringify(info), method: 'POST',
    headers: {'Content-Type': 'application/json'}});
    const json =await data.json();
    return json;
  },

    /**
   * here new user log in  after filling the signIn form 
   * and pressing on login button 
   * we get the data as param
   * @param {string} requestInfo
   * and post them to db for checking
   * we get token as reponse and we save this token in local storage to check if user logged in 
   */

  async logIn(requestInfo){
    const data =await fetch(`${base_url}/auth/login`, { body: JSON.stringify(requestInfo), method: 'POST',
    headers: {'Content-Type': 'application/json'}});
    const json =await data.json();
    window.localStorage.setItem('token', json.token);
    window.location.href = "http://127.0.0.1:5500/src/client/index.html";
  },

  /**
   * here logged in user can logou
   * by pressing on account button and choosing logout button 
   * we delete the token from local storage
   */
  async logOut(){
    window.localStorage.removeItem('token');
    window.location.href = "http://127.0.0.1:5500/src/client/signUp_In.html";
  },

// async getCart() {
//   return await call(`${base_url}/cart`, 'GET');
// },
async getProfile() {
  const result =  await this.call(`${base_url}/users/profile`, 'GET');
  const profile = result.profile
  console.log(profile)
  return profile;
},
// async addToCart(productId) {
//   const body = { productId: productId};
//   return await call(`${base_url}/cart/products`, 'POST', body);
// },
async call(url, method, body){
  const token = window.localStorage.getItem('token');
  const options = { method: method, headers: { 'Authorization': `Bearer ${token}`}};
  if(body) {
    options.body = body;
  }
  const data =await fetch(url, options);
  const json =await data.json();
  if(json.name === 'TokenExpiredError'){
    await this.logOut();
  }

  return json;
},

}
// start the app
app.init();
