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
      let promo = (await knexWebShop('Promo').where("promo_id", parseInt(id)))[0];
      const products = await knexWebShop('Products')
        .innerJoin("Promo", "Products.promo_id", "Promo.promo_id")
        .where("Promo.promo_id", id)
        .select("Products.*");
      promo.products = products;
      return promo;
    } catch(e) {
     console.error(e.message);
    }
  }
  


}