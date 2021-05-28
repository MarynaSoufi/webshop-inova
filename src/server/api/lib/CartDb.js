/**
 * writing to and getting data from db
 */

 import knexWebShop from '../../db/knexWebShop.js';

 export default class CartDb{

  async getOwnCart(id) {
    try {
        const cart = (await knexWebShop('Cart')
        .where('user_id', parseInt(id))
        .select('Cart .*'))[0];
        const products = await knexWebShop('Products')
        .innerJoin("CartHasProducts", "CartHasProducts.product_id", "Products.product_id")
        .innerJoin("Cart", "Cart.cart_id", "CartHasProducts.cart_id")
        // .where('WishListHasProducts.list_id', 'WishList.list_id', 'WishListHasProducts.list_id')
        .select("Products .*")
        cart.products = products;
        return cart;
    } catch (e) {
      return console.error(e.message);
    }
  }

  async getQuantity(id, product_id) {
    try {
        const cart = (await knexWebShop('CartHasProducts')
        .where('cart_id', parseInt(id))
        .where('product_id', parseInt(product_id))
        .select('CartHasProducts .*'))[0];
        return cart;
    } catch (e) {
      return console.error(e.message);
    }
  }

  async addProductToCart( product_id, cart_id, quantity) {
    try {
      
      return await knexWebShop('CartHasProducts').where( {cart_id: cart_id}).insert({ cart_id:cart_id, product_id: product_id, quantity: quantity});
   
    } catch (e) {
      return console.error(e.message);
    }
  }

  async update(product_id, cart_id, quantity) {
    try {
        return await knexWebShop('CartHasProducts').where("cart_id", cart_id).where("product_id", product_id).update({ quantity});
    } catch(e) {
      console.error(e.message);
    }
  }

  async delete(cart_id, product_id) {
    try {
      return await knexWebShop('CartHasProducts').where({cart_id: cart_id}).where({product_id: product_id}).del();
    } catch(e) {
      console.error(e.message);
    }
  }

  

  

 }
