import ProductsDb from "../../lib/ProductsDb.js";
import OrderDb from "../../lib/OrderDb.js";
import * as productsController from './crudProducts.js'

export default (app) => {
  
  const database = { order: new OrderDb(), product: new ProductsDb() };
 /**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of products. Can be used to populate a list of categories when prototyping or testing an API.
*/
  app.get('/products', async (req, res) => await productsController.getProducts(database.product, req, res));
  /**
 * @swagger
 * /products/promo:
 *   get:
 *     summary: Get promo products
 *     description: Retrieve a list of products with promo. Can be used to populate a list of products with promo when prototyping or testing an API.
*/
  // get the todos
  app.get('/products', async (req, res) => await productsController.getProducts(database.product, req, res));
  app.get('/products/promo', async (req, res) => await productsController.getProductsWithPromo(database.product, req, res));

  /**
 * @swagger
 * /products/:id:
 *   get:
 *     summary: Get products based on given id
 *     description: Retrieve aproduct. 
*/
  app.get('/products/:id', async (req, res) => await productsController.getOneProduct(database, req, res));

  /**
 * @swagger
 * /search?categoryId=2&tagId=1&tagId=2&tagId=3:
 *   get:
 *     summary: Search products
 *     description: Retrieve a list of products. Can be used to populate a list of products when prototyping or testing an API.
*/
  app.get('/search', async (req, res) => await productsController.searchProducts(database.product, req, res));

}