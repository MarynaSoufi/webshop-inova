import express from 'express';
 const app = express.Router();
 import WishListDb from '../../lib/WishListDb.js';
 import * as wishListController from './crudWishList.js';


 
const wishListData = new WishListDb();
app.get('/', async (req, res) => await wishListController.getOwnWishList(wishListData, req, res));
app.post('/product/:productId', async (req, res) => await wishListController.addProduct(wishListData,req, res));
app.delete("/product/:productId",  async (req, res) => await wishListController.deleteProduct(wishListData,req, res));

export default app;