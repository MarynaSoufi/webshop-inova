import ProductsDb from "../../lib/ProductsDb.js";
import * as productsController from './crudProducts.js'

export default (app) => {
  // create a ToDo file to work with
  // const todoData = new TodoFile(process.env.TODOS_FILEPATH);
  const productData = new ProductsDb();

  // get the todos
  app.get('/products', async (req, res) => await productsController.getProducts(productData,req, res));

  //get one product by index
  app.get('/products/:id', async (req, res) => await productsController.getOneProduct(productData,req, res));

  // add a todo
  app.post('/products', async (req, res) => await addTodo(todoData, req, res));

  // update a todo
  app.put('/products/:id', async (req, res) => await updateTodo(todoData, req, res));

  // delete a todo
  app.delete('/products/:id', async (req, res) => await deleteTodo(todoData, req, res));
}