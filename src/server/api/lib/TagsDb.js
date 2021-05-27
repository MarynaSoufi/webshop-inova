import knexWebShop from '../../db/knexWebShop.js'


export default class TagsDb {
 
/**
 * Get all tags
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