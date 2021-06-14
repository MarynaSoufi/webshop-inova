import express from 'express';
const app = express.Router();
import OrderDb from '../../lib/OrderDb.js';
import CartDb from '../../lib/CartDb.js';
import * as ordersController from './crudOrders.js';
const getOrders = new OrderDb();

const database = { order: new OrderDb(), cart: new CartDb() };
 /**
 * @swagger
 * /orders/:orderId:
 *   get:
 *     summary: Get order based on given id
 *     description: Retrieve order based on given id. 
*/
app.get('/:orderId', async (req, res) => await ordersController.getOrder(getOrders, req, res));

/**
 * @swagger
 * /orders/all:
 *   get:
 *     summary: Get orders of current user
 *     description: Retrieve orders of current user. 
*/
app.get('/', async (req, res) => await ordersController.getAllOrders(getOrders, req, res))

 /**
 * @swagger
 * /orders/:
 *   post:
 *     summary: Place order
 *     description: Place order. 
*/
app.post('/', async (req, res) => await ordersController.placeOrder(database, req, res));

/**
 * @swagger
 * /orders/:orderId/sent:
 *   put:
 *     summary: Update order status with status sent
 *     description: Update order status with status sent. 
*/
app.put('/:orderId/sent', async (req, res) => await ordersController.updateOrderSent(getOrders, req, res));

/**
 * @swagger
 * /orders/:orderId/delivered:
 *   put:
 *     summary: Update order status with status delivered
 *     description: Update order status with status delivered. 
*/
app.put('/:orderId/delivered', async (req, res) => await ordersController.updateOrderDelivered(getOrders, req, res));

export default app;