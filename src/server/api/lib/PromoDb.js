import knexWebShop from '../../db/knexWebShop.js'


export default class PromoDb {
 
/**
 * Get all promos
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Promo');
    } catch (message) {
      console.error(message);
    }
  }

}