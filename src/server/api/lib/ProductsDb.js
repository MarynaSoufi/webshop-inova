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

  // async getAllProductsWithPromo() {
  //   try {
  //     const product =  await knexWebShop('Products')
  //     .where("Products.promo_id", !null)
  //      return product
  //   } catch (message) {
  //     console.error(message);
  //   }
  // }

  async getAllProductsWithPromo() {
    try {
      const product =  (await knexWebShop('Products')
      .where("Products.promo_id", !null)
      .innerJoin("Promo", "Promo.promo_id", "Products.promo_id")
      .select('Products.*', 'Promo.percent'));
       return product
    } catch (message) {
      console.error(message);
    }
  }

  async getProduct(id) {
    try {
      const product =  (await knexWebShop('Products')
      .where('Products.product_id', parseInt(id))
      .select('Products.*'))[0];

      const tags = await knexWebShop('Products')
      .innerJoin("ProductsHasTags", "Products.product_id", "ProductsHasTags.product_id")
      .innerJoin("Tags", "ProductsHasTags.tag_id", "Tags.tag_id")
      .where('Products.product_id', parseInt(id))
      .select("Tags.*");

      const reviews = await knexWebShop('Reviews')
      .innerJoin("Products", "Reviews.product_id", "Products.product_id")
      .innerJoin("Profiles", "Reviews.user_id", "Profiles.user_id")
      .where('Reviews.product_id', parseInt(id))
      .select("Reviews.*", "Profiles.firstName", "Profiles.LastName");

      product.reviews = reviews;

      product.tags = tags;
      return product;
    } catch (e) {
      return console.error(e.message);
    }
  }

  async search(query) {
    try {
      const products = await knexWebShop('Products')      
      .innerJoin("Categories", "Products.category_id", "Categories.category_id")
      .innerJoin("ProductsHasTags", "Products.product_id", "ProductsHasTags.product_id")
      .innerJoin("Tags", "ProductsHasTags.tag_id", "Tags.tag_id")
      .where("Products.category_id", query.categoryId)
      .whereIn("ProductsHasTags.tag_id",query.tagIds)
      .groupBy("Products.product_id")
      .select("Products.*");

      return products;
    } catch (e) {
      return console.error(e.message);
    }
  }

  }
  
  


