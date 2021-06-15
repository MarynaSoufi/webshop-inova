// IMPORTS START -->

import { base_url } from './consts.js';
import {getProfile} from './apiPersonal.js';
import{getWishList} from './apiWishlist.js';
import{fetchCats} from './apiCategories.js';
import {fetchItems} from './apiProducts.js';
import { fetchItemDetail } from './apiDetail.js';
import { getOwnCart } from './apiCart.js';
import { getOwnorders } from './apiOrders.js';

// <-- IMPORTS END

const app = {

  /**
   * Initialize the application
   */

  async init() {
    this.cacheElements();
    this.registerListeners();
    fetchCats(); 
    fetchItems();
    fetchItemDetail(); 
    this.picsBorder();
    if(this.isAuthenticated()){
      getProfile();
    }
    if(this.isAuthenticated()){
      getWishList();
    }
    if(this.isAuthenticated()){
      getOwnCart();
      getOwnorders();
    }
    
  },

  /**
   * Get the nedded elements from dom
   */

  cacheElements(){
    
    this.$openAc = document.querySelectorAll('.ac');
    this.$closeAc = document.querySelector('.account__modal__top__close');
    this.$ac = document.querySelector('.account__modal');
    this.$log = document.querySelectorAll('.log');
    this.$unlog = document.querySelector('.unlog');
    this.$logOut = document.querySelector('.logOut');

    //SignUp_in page elements

    this.$loginBtn = document.querySelector('.js-login');
    this.$logInInputEmail = document.querySelector('.email-log');
    this.$logInInputpass = document.querySelector('.password-log');

    this.$createBtn = document.querySelector('.js-create');
    this.$signUpEmail = document.querySelector('.email-signUp');
    this.$signUppass = document.querySelector('.pass-signUp');
    this.$signSection = document.querySelector('.sign');
    this.$warning = document.querySelector('.warning');
    this.$cookies = document.querySelector('.cookies');
    this.$acceptCookies = document.querySelector('.js-accept')
  },

  /**
   * All eventListeners here
   */

  registerListeners(){
    //warning
    document.addEventListener('DOMContentLoaded',()=>{
      if (!this.$cookies) {
        return;
      }
      const hasReadCookiesInfo = window.localStorage.getItem('hasReadCookiesInfo');
      if (!hasReadCookiesInfo) {
        setTimeout(() => { this.$cookies.style.display='block'; }, 6000);
      } else {
        this.$cookies.style.display='none';
      }

      const hasVisitedSite = window.localStorage.getItem('hasVisitedSite');
      if(!hasVisitedSite) {
        this.$warning.style.display='block';
        setTimeout(()=>{
          window.localStorage.setItem('hasVisitedSite', 'true');
          this.$warning.style.display='none';
          },5000);
      }
    })

    if (this.$acceptCookies) {
      this.$acceptCookies.addEventListener('click',()=>{
        window.localStorage.setItem('hasReadCookiesInfo', 'true');
        this.$cookies.style.display='none';
      });
    }

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
          this.$closeAc.style.marginLeft = '13rem';
        }
    })
    })

    this.$closeAc.addEventListener('click',()=>{
      this.$ac.style.display = 'none';
    })

    // login button on signUp_in page
    if(this.$loginBtn){
      this.$loginBtn.addEventListener('click', async(e) => {
        e.preventDefault();
        const email = this.$logInInputEmail.value;
        const password = this.$logInInputpass.value;
        this.requestInfo = { email: email, password: password};
        await this.logIn(this.requestInfo);
      }); 
    }  
    //logOut button 

    this.$logOut.addEventListener('click',async (e)=>{
      if(this.isAuthenticated()) {        
          e.preventDefault();
          console.log('p')
          await this.logOut();
          this.$ac.style.display = 'none';    
      }
    })

    // Register/Create account button on signUp_in page
    if(this.$createBtn) {
      this.$createBtn.addEventListener('click', async(e) => {
        e.preventDefault();
        const email = this.$signUpEmail.value;
        const password = this.$signUppass.value;
        this.info = { user: {email: email, password: password} };
        await this.signUp(this.info);
        console.log('created')
        window.location.href = "http://127.0.0.1:5500/src/client/index.html";
      });
    }   
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
    const $instaPics = document.querySelectorAll('.pic')
    if($instaPics){
      $instaPics.forEach((p, index)=>{
        if(index % 2 === 0){
          p.classList.add('border');
        }
      });
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
    try {
      const data =await fetch(`${base_url}/users`, { body: JSON.stringify(info), method: 'POST',
        headers: {'Content-Type': 'application/json'}});
        if(!data.ok) {
          throw new Error("Something went wrong");
        }
      const json =await data.json();
      return json;
    } catch (e) {
      alert(e.message)
    }
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
    try {
      const data =await fetch(`${base_url}/auth/login`, { body: JSON.stringify(requestInfo), method: 'POST',
        headers: {'Content-Type': 'application/json'}});
      if(!data.ok) {
        if(data.status === 401) {
          throw new Error("Incorrect user or password");
        }
        else {
          throw new Error("Something went wrong");
        }
      }
      const json =await data.json();
      console.log(json)
      window.localStorage.setItem('token', json.token);
      window.location.href = "http://127.0.0.1:5500/src/client/index.html";
    } catch (e) {
      alert(e.message);
    }
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

}
// start the app
app.init();
