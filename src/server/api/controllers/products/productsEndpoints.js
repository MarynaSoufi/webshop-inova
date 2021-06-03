import ProductsDb from "../../lib/ProductsDb.js";
import * as productsController from './crudProducts.js'

export default (app) => {
  
  const productData = new ProductsDb();

  // get the todos
  app.get('/products', async (req, res) => await productsController.getProducts(productData, req, res));
  app.get('/products/promo', async (req, res) => await productsController.getProductsWithPromo(productData,req, res));

  //get one product by index
  app.get('/products/:id', async (req, res) => await productsController.getOneProduct(productData,req, res));

  //search products
  app.get('/search', async (req, res) => await productsController.searchProducts(productData,req, res));
  
}