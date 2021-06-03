import knexWebShop from '../../db/knexWebShop.js'


export default class ReviewsDb {
 
/**
 * Get all reviews
 * 
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Reviews');
    } catch (message) {
      console.error(message);
    }
  }
/**
 * add review
 * @param {*} id 
 * @param {*} id_user 
 * @param {*} description 
 * @returns 
 */
  async addReview(id, id_user, description) {
    try {
      return await knexWebShop('Reviews').insert({ product_id: id, user_id: id_user, description: description});
    } catch (e) {
      return console.error(e.message);
    }
  }

}