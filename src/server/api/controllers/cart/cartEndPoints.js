/**
 * Registering the cart API endpoints
 */

 import express from 'express';
 const app = express.Router();
 import CartDb from '../../lib/CartDb.js';
 import * as cartController from './crudCart.js';


 const cartData = new CartDb();
 app.get('/', async (req, res) => await cartController.getCart(cartData, req, res));
 app.post('/product/:productId', async (req, res) => await cartController.addProduct(cartData, req, res))
 export default app;