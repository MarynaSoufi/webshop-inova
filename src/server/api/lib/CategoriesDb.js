import knexWebShop from '../../db/knexWebShop.js'


export default class CategoriesDb {
 
/**
 * Get all products
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Categories');
    } catch (message) {
      console.error(message);
    }
  }

  async getOneCategory(id) {
    try {
      return await knexWebShop('Categories')
        .where('category_id', parseInt(id) )
    } catch (e) {
      return console.error(e.message);
    }
  }

  async getCategory(id) {
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