import knexWebShop from '../../db/knexWebShop.js'


export default class SubscribeDb {
 
/**
 * Get all products
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Subscription');
    } catch (message) {
      console.error(message);
    }
  }

  async getOne(id) {
    try {
      return await knexWebShop('Subscription')
        .where('subscription_id', parseInt(id) )
    } catch (e) {
      return console.error(e.message);
    }
  }

}