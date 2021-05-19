import knexWebShop from '../../db/knexWebShop.js'


export default class TafsDb {
 
/**
 * Get all promos
 * @returns 
 */
  async getAll() {
    try {
      return await knexWebShop('Tags');
    } catch (message) {
      console.error(message);
    }
  }

}