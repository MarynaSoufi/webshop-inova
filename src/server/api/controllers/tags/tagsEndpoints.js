import TagsDb from "../../lib/TagsDb.js";
import * as tagsController from './crudTags.js'
import sequelize from '../../../database/index.js';

export default (app) => {
  const tagsData = new TagsDb();

  // get all tags
  app.get('/tags', async (req, res) => await tagsController.getAllTags(sequelize,req, res));

}