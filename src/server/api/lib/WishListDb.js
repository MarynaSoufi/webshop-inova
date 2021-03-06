import knexWebShop from '../../db/knexWebShop.js'


export default class WishListDb {
/**
 * Add product to wishlist
 * @param {*} product_id 
 * @param {*} list_id 
 * @returns 
 */
  async addProduct(product_id, list_id ) {
    try {
      return await knexWebShop('WishListHasProducts').where( {list_id: list_id}).insert({product_id: product_id, list_id: list_id});
    } catch (e) {
      return console.error(e.message);
    }
  }

/**
 * get wishlist by userId
 * @param {*} id 
 * @returns 
 */
  async getList(id) {
    try {
        const list = (await knexWebShop('WishList')
        .where('user_id', parseInt(id))
        .select('WishList .*'))[0];
        const products = await knexWebShop('Products')
        .innerJoin("WishListHasProducts", "WishListHasProducts.product_id", "Products.product_id")
        .innerJoin("WishList", "WishList.list_id", "WishListHasProducts.list_id")
        .where('WishList.list_id', list.list_id)
        .select("Products .*")
        list.products = products;
        return list;
    } catch (e) {
      return console.error(e.message);
    }
  }

   /**
   * delete product from the list
   * @param {*} product_id 
   * @param {*} list_id 
   */
    async deleteProduct(product_id, list_id ) {
      try {
         await knexWebShop('WishListHasProducts')
         .where("product_id", product_id)
         .where("list_id", list_id )
         .del();       
      }catch (e){
          console.error(e.message);
      }
    }
  

  

  }
  
  


