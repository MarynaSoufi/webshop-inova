/**
 * Registering the cart API endpoints
 */

 import express from 'express';
 const app = express.Router();
 import CartDb from '../../lib/CartDb.js';
 import * as cartController from './crudCart.js';


 const cartData = new CartDb();
 app.get('/', async (req, res) => await cartController.getCart(cartData, req, res));
 app.get('/quantity/product/:productId', async (req, res) => await cartController.getQuantity(cartData, req, res));
 app.post('/product/:productId', async (req, res) => await cartController.addProduct(cartData, req, res));
 app.put('/product/:productId', async (req, res) => await cartController.updateCart(cartData, req, res));
 app.put('/min/product/:productId', async (req, res) => await cartController.updateCartMin(cartData, req, res));
 app.delete("/product/:productId", async (req, res) => await cartController.deleteProduct(cartData, req, res));
 export default app;