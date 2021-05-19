import TagsDb from "../../lib/TagsDb.js";
import * as tagsController from './crudTags.js'

export default (app) => {
  // create a ToDo file to work with
  // const todoData = new TodoFile(process.env.TODOS_FILEPATH);
  const tagsData = new TagsDb();

  // get the promo
  app.get('/tags', async (req, res) => await tagsController.getTags(tagsData,req, res));

}