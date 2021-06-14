import ProductsDb from "../../lib/ProductsDb.js";
import * as productsController from './crudProducts.js'

export default (app) => {
  
  const productData = new ProductsDb();
<<<<<<< HEAD
 /**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of products. Can be used to populate a list of categories when prototyping or testing an API.
*/
  app.get('/products', async (req, res) => await productsController.getProducts(productData, req, res));
  /**
 * @swagger
 * /products/promo:
 *   get:
 *     summary: Get promo products
 *     description: Retrieve a list of products with promo. Can be used to populate a list of products with promo when prototyping or testing an API.
*/
=======

  // get the todos
  app.get('/products', async (req, res) => await productsController.getProducts(productData, req, res));
>>>>>>> 4d4ab60c06af6d3ae11d194590f2eb88e939bf11
  app.get('/products/promo', async (req, res) => await productsController.getProductsWithPromo(productData,req, res));

  /**
 * @swagger
 * /products/:id:
 *   get:
 *     summary: Get products based on given id
 *     description: Retrieve aproduct. 
*/
  app.get('/products/:id', async (req, res) => await productsController.getOneProduct(productData,req, res));

  /**
 * @swagger
 * /search?categoryId=2&tagId=1&tagId=2&tagId=3:
 *   get:
 *     summary: Search products
 *     description: Retrieve a list of products. Can be used to populate a list of products when prototyping or testing an API.
*/
  app.get('/search', async (req, res) => await productsController.searchProducts(productData,req, res));
  
}