import ProductsDb from "../../lib/ProductsDb.js";
import * as productsController from './crudProducts.js'

export default (app) => {
  // create a ToDo file to work with
  // const todoData = new TodoFile(process.env.TODOS_FILEPATH);
  const productData = new ProductsDb();

  // get the todos
  app.get('/products', async (req, res) => await productsController.getProducts(productData,req, res));

  //get one product by index
  app.get('/products/:id', async (req, res) => await productsController.getOneProduct(productData,req, res));

  app.get('/promo/:id/products', async (req, res) => await productsController.getPromoProducts(productData, req, res));

 
  
}