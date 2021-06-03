import TagsDb from "../../lib/TagsDb.js";
import * as tagsController from './crudTags.js'

export default (app) => {
  const tagsData = new TagsDb();

  // get all tags
  app.get('/tags', async (req, res) => await tagsController.getTags(tagsData,req, res));

}