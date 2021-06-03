import express from 'express';
const app = express.Router();
import OrderDb from '../../lib/OrderDb.js';
import CartDb from '../../lib/CartDb.js';
import * as ordersController from './crudOrders.js';
const getOrders = new OrderDb();

const database = { order: new OrderDb(), cart: new CartDb() };
app.get('/:orderId', async (req, res) => await ordersController.getOrder(getOrders, req, res));
app.post('/', async (req, res) => await ordersController.placeOrder(database, req, res));
app.put('/:orderId/sent', async (req, res) => await ordersController.updateOrderSent(getOrders, req, res));
app.put('/:orderId/delivered', async (req, res) => await ordersController.updateOrderDelivered(getOrders, req, res));
// app.delete("/product/:productId",  async (req, res) => await wishListController.deleteProduct(wishListData,req, res));

export default app;