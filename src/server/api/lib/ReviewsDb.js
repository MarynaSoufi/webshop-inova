import knexWebShop from '../../db/knexWebShop.js'


export default class PromoDb {
 
/**
 * Get all promos
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Reviews');
    } catch (message) {
      console.error(message);
    }
  }

}