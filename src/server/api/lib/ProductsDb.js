import knexWebShop from '../../db/knexWebShop.js'


export default class ProductsDb {
 
/**
 * Get all products
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Products');
    } catch (message) {
      console.error(message);
    }
  }

  async getProduct(id) {
    try {
      return await knexWebShop('Products')
        .where('product_id', parseInt(id) )
    } catch (e) {
      return console.error(e.message);
    }
  }

  async add(description) {
    try {
      return await knexWebShop('Products').insert({ description });
    } catch(e) {
      Logger.error(e.message);
    }
  }

  
  async getPromo(id) {
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
  


}