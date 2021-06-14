import express from 'express';
 const app = express.Router();
 import ReviewsDb from '../../lib/ReviewsDb.js';
 import * as reviewsController from './crudReviews.js';


 
const reviewData = new ReviewsDb();

<<<<<<< HEAD
/**
 * @swagger
 * /reviews/product/:productId:
 *   post:
 *     summary: set review based on product id
 *     description: set review based on product id. 
*/
=======
>>>>>>> 4d4ab60c06af6d3ae11d194590f2eb88e939bf11
app.post('/product/:productId', async (req, res) => await reviewsController.addRev(reviewData,req, res));


export default app;