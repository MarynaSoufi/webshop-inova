import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerProductsEndpoints from './api/controllers/products/productsEndpoints.js';
import registerCategoriesEndpoints from './api/controllers/categories/categoriesEndpoints.js';
import registerPromoEndpoints from './api/controllers/promo/promoEndpoints.js';
import registerTagsEndpoints from './api/controllers/tags/tagsEndpoints.js';

//init dotenv 
dotenv.config();

//create a new express application
const app = Express();
//add json body-parser 
app.use(bodyParser.json());

// add cors
app.use(cors());

// register the endpoints
registerProductsEndpoints(app);
registerCategoriesEndpoints(app);
registerPromoEndpoints(app);
registerTagsEndpoints(app);


//open the application
app.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
})
console.log('Starting the server...');