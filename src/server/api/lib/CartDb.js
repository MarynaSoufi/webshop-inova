/**
 * writing to and getting data from db
 */

 import knexWebShop from '../../db/knexWebShop.js';

 export default class CartDb{

  async getCart(id, userId) {
    try {
      return await knexSpotify('Cart').where("user_id",userId).where("id", parseInt(id) );
    } catch (e) {
      return console.error(e.message);
    }
  }

  async getOwnCart(id) {
    try{
     return await knexWebShop('Cart').where('user_id', parseInt(id)).select('*');
    }
    catch (err) {
     console.error(err.message);
   }
  }
  async addProductToCart(id, productId, quantity) {
    try {
      
      const productAddedToCartResult = await knexWebShop('CartHasProducts').insert({ cart_id:id, product_id: productId, quantity: quantity});
      return productAddedToCartResult;
    } catch (e) {
      return console.error(e.message);
    }
  }
 }
//  async updateProfile(id, firstName, lastName, mobileNumber, addressLine) {
//   try {
//     return await knexWebShop('Profiles').where('user_id', id).update({firstName: firstName, lastName:lastName, mobileNumber: mobileNumber, addressLine: addressLine});
//   } catch (e) {
//     console.error(e.message);
//   }
// }