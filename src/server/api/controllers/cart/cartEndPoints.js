/**
 * Registering the cart API endpoints
 */

 import express from 'express';
 const app = express.Router();
 import CartDb from '../../lib/CartDb.js';
 import * as cartController from './crudCart.js';


 const cartData = new CartDb();
 //get own cart
 app.get('/', async (req, res) => await cartController.getCart(cartData, req, res));
 //get quantity products from cart
 app.get('/quantity/product/:productId', async (req, res) => await cartController.getQuantity(cartData, req, res));
 //add product to cart
 app.post('/product/:productId', async (req, res) => await cartController.addProduct(cartData, req, res));
 //update quantity (+)
 app.put('/product/:productId', async (req, res) => await cartController.updateCart(cartData, req, res));
 //update quantity(-)
 app.put('/min/product/:productId', async (req, res) => await cartController.updateCartMin(cartData, req, res));
 //delete product from cart by productId
 app.delete("/product/:productId", async (req, res) => await cartController.deleteProduct(cartData, req, res));
 //delete all roducts from cart
 app.delete("/product/", async (req, res) => await cartController.deleteAllProducts(cartData, req, res));
 export default app;