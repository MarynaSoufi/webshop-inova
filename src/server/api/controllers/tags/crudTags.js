
/**
 * get all tags
 * @param {*} req 
 * @param {*} res 
 */
 export const getTags = async (tag, request, response) => {
  try {
    response.status(200).json({ tags: await tag.getAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};


