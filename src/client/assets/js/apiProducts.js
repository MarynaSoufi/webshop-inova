import { base_url } from './consts.js';
const $hero = document.querySelector('.hero');
const $promo = document.querySelector('.promo');
const $insta = document.querySelector('.insta');
const $itemsSection = document.querySelector('.items');
const $listProductsById = document.querySelector('.items_list');
const $cat = document.querySelector('.cat');
/**
 *get promo products if it's homepage without specific category
*get all products of category if on homepage chosen this category
*/
export const fetchItems = async() => {
//get url params to check if user choosed a category
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('categoryId');
const name = urlParams.get('categoryName');



//if user choosed a category so we change the layout of the home page

if(category) {
  document.title = `INOVA | ${name}`;
  $hero.style.display = 'none'
  $promo.style.display = 'none'
  $insta.style.display = 'none'
  $itemsSection.classList.add('listGroup');
  $listProductsById.classList.add('listGroup__items');
  $cat.innerHTML = name;
  const tags = await fetch(`${base_url}/tags`);
  const res  =await tags.json();
  const tagsResult = res.tags
  console.log(tagsResult)

  const data =await fetch(`${base_url}/categories/${category}/all_products`);
  const json =await data.json();
  const result = json.products;
  createListProductsByCategory(result, tagsResult)
}
//if user didnt choose any category so we create the layout of the home page
else{
  if($itemsSection && $listProductsById){
    $itemsSection.classList.add('listHome');
    $listProductsById.classList.add('listHome__items');
    const data =await fetch(`${base_url}/products/promo`);
    const json =await data.json();
    const result = json.products;
    createListProductsByCategory(result.slice(0,8))
  }
}
};

const createListProductsByCategory=(result) =>{
  let str= '';
    if ($listProductsById){
      console.log(result)
      result.forEach((e)=>{
        str+=`
        <a href = '/src/client/detail.html?productId=${e.product_id}&prductName=${e.name}' >
          <img src="./assets/images/${e.image}.jpg" alt="image ${e.name}" class = 'image image--list'/>
          <strong>${e.name}</strong>
          <div class='price'>
            <p class='price__amount'>€${e.price}</p>
            <p class='price__disc'>${e.promo_id > 0 ? '(you save €' + `${Math.round(e.price * 0.1)}.00)` : ''}</p>
          </div>
          
        </a>
        
        `;
      });
      $listProductsById.innerHTML = str;
    
    }
};