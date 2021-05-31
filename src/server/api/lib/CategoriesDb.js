import knexWebShop from '../../db/knexWebShop.js'


export default class CategoriesDb {
 
/**
 * Get all categories
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Categories');
    } catch (message) {
      console.error(message);
    }
  }
/**
 * get one category by id
 * @param {} id 
 * @returns 
 */
  async getOneCategory(id) {
    try {
      return await knexWebShop('Categories')
        .where('category_id', parseInt(id) )
    } catch (e) {
      return console.error(e.message);
    }
  }
/**
 * get all product dy category id
 * @param {*} id 
 * @returns 
 */
  async getCategory(id) {
    try {
      let category = (await knexWebShop('Categories').where("category_id", parseInt(id)))[0];
      const products = await knexWebShop('Products')
        .innerJoin("Categories", "Products.category_id", "Categories.category_id")
        .innerJoin("Promo", "Products.promo_id", "Promo.promo_id")
        .where("Products.category_id", id)
        .select("Products.*", "Promo.*");
      category.products = products;
      return category;
    } catch(e) {
     console.error(e.message);
    }
  }

  async getCategoryAllProducts(id) {
    try {
      let category = (await knexWebShop('Categories').where("category_id", parseInt(id)))[0];
      const products = await knexWebShop('Products')
        .innerJoin("Categories", "Products.category_id", "Categories.category_id")
        .where("Products.category_id", id)
        .select("Products.*");
      category.products = products;
      return category;
    } catch(e) {
     console.error(e.message);
    }
  }

  async getTags(category_id, tag_id) {
    try {
      //let category = (await knexWebShop('Categories').where("category_id", parseInt(category_id)))[0];
      const products = await knexWebShop('Products')      
        .innerJoin("Categories", "Products.category_id", "Categories.category_id")
        .innerJoin("ProductsHasTags", "Tags.tag_id", "ProductsHasTags.tag_id")
        .where("Products.category_id", category_id )
        .where("ProductsHasTags.tag_id", tag_id)
        .select("Products.*");
        category.products = products;
        return category;
    } catch(e) {
     console.error(e.message);
    }
  }

}