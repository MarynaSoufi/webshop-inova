import { base_url } from './consts.js';
  /**
   * get all categories from db 
   */

  export const fetchCats = async () => {
    const data =await fetch(`${base_url}/categories`);
    const json =await data.json();
    const result = json.categories;

    //with this data create subnav menu for categories

    createSubNav(result)
  };
  /**
   * After getting data (all categories) this function creates elements in header
   * @param {array} result
   */
  const createSubNav = (result)=>{
    const $subNavList = document.querySelector('.subNav__list');
    let str= '';
    if ($subNavList){
      result.forEach((e)=>{
        str+=`
        <a href="/src/client/index.html?categoryId=${e.category_id}&categoryName=${e.name}" id=${e.category_id} class="subNav__item__link" >${e.name}</a>
        `;
      });
      $subNavList.innerHTML = str;
    }
  };