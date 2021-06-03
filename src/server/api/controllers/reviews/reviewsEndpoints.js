import express from 'express';
 const app = express.Router();
 import ReviewsDb from '../../lib/ReviewsDb.js';
 import * as reviewsController from './crudReviews.js';


 
const reviewData = new ReviewsDb();

app.post('/product/:productId', async (req, res) => await reviewsController.addRev(reviewData,req, res));


export default app;