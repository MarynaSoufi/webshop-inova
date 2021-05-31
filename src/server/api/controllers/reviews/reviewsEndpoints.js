import express from 'express';
 const app = express.Router();
 import ReviewsDb from '../../lib/ReviewsDb.js';
 import * as reviewsController from './crudReviews.js';
 import sequelize from '../../../database/index.js';


 
const reviewData = new ReviewsDb();
// app.get('/', async (req, res) => await usersController.getUsers(usersData, req, res));
app.post('/product/:productId', async (req, res) => await reviewsController.addRev(reviewData,req, res));
app.get('/', async (req, res) => await reviewsController.getAllReviews(sequelize,req, res));
// app.delete('/', async (req, res) => await usersController.deleteUser (usersData, req, res));
// app.put('/', async (req, res) => await usersController.updateUser (usersData, req, res));
// app.put('/email', async (req, res) => await usersController.updateEmail (usersData, req, res));
// app.put('/password', async (req, res) => await usersController.updatePassword (usersData, req, res));
// app.get('/profile', async (req, res) => await usersController.getOwnProfile(usersData, req, res));
// app.put('/profile', async (req, res) => await usersController.updateUsersProfile(usersData, req, res));
export default app;