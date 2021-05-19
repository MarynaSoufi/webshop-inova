import CategoriesDb from "../../lib/CategoriesDb.js";
import * as categoriesController from './crudCategories.js'

export default (app) => {
  // create a ToDo file to work with
  // const todoData = new TodoFile(process.env.TODOS_FILEPATH);
  const categoryData = new CategoriesDb();

  // get the todos
  app.get('/categories', async (req, res) => await categoriesController.getCategories(categoryData,req, res));

  app.get('/categories/:id', async (req, res) => await categoriesController.getCategory(categoryData,req, res));

  //get one product by index
  app.get('/categories/:id/products', async (req, res) => await categoriesController.getCategoryProducts(categoryData, req, res));
  app.get('/categories/:categoryId/products/:tagId', async (req, res) => await categoriesController.getCategoryProductsTags(categoryData, req, res));
  app.get('/categories/:categoryId/products/promo/:promoId', async (req, res) => await categoriesController.getPromoProducts(categoryData, req, res));


} 