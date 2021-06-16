/**
 * Registering the users API endpoints
 */

 import express from 'express';
 const app = express.Router();
 import UsersDb from '../../lib/UsersDb.js';
 import OrderDb from '../../lib/OrderDb.js';
 import * as usersController from './crudUsers.js';


 
const usersData = new UsersDb();
const ordersData = new OrderDb();
app.get('/', async (req, res) => await usersController.getUsers(usersData, req, res));
app.post('/', async (req, res) => await usersController.addUser (usersData, req, res));
app.delete('/', async (req, res) => await usersController.deleteUser (usersData, req, res));
app.put('/', async (req, res) => await usersController.updateUser (usersData, req, res));
app.put('/email', async (req, res) => await usersController.updateEmail (usersData, req, res));
app.put('/password', async (req, res) => await usersController.updatePassword (usersData, req, res));
app.get('/profile', async (req, res) => await usersController.getOwnProfile(usersData, req, res));
app.put('/profile', async (req, res) => await usersController.updateUsersProfile(usersData, req, res));
app.get('/products/:id/permissions', async (req, res) => await usersController.getPermissionsByProduct(ordersData, req, res));
export default app;