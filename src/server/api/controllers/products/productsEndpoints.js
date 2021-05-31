import ProductsDb from "../../lib/ProductsDb.js";
import * as productsController from './crudProducts.js'
import sequelize from '../../../database/index.js';

export default (app) => {
  // create a ToDo file to work with
  // const todoData = new TodoFile(process.env.TODOS_FILEPATH);
  const productData = new ProductsDb();
  //console.log(sequelize);

  // get the todos
  app.get('/products', async (req, res) => await productsController.getProducts2(sequelize, req, res));
  app.get('/category/:categoryId/products', async (req, res) => await productsController.getProductByCategoryId(sequelize, req, res));
  app.get('/products/promo', async (req, res) => await productsController.getProductsWithPromo(productData,req, res));

  //get one product by index
  app.get('/products/:id', async (req, res) => await productsController.getOneProduct(productData,req, res));

  //search products
  app.get('/search', async (req, res) => await productsController.searchProducts(productData,req, res));
  
}