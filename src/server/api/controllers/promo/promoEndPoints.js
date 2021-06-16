import PromoDb from "../../lib/PromoDb.js";
import * as promoController from './crudPromo.js';


export default (app) => {
  // create a ToDo file to work with
  // const todoData = new TodoFile(process.env.TODOS_FILEPATH);
  const promoData = new PromoDb();

  // get the promo
  app.get('/promo', async (req, res) => await promoController.getPromo(promoData,req, res));

}