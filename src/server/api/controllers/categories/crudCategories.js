/**
 * get  all categories
 * @param {*} category 
 * @param {*} request 
 * @param {*} response 
 */
 export const getCategories = async (category, request, response) => {
  try {
    response.status(200).json({ categories: await category.getAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
}

/**
 * get one category
 * @param {*} category 
 * @param {*} request 
 * @param {*} response 
 */
  export const getCategory = async (category, request, response) => {
    try {
      const id = request.params.id;
      console.log(id);
      response.status(200).json({ category: await category.getOneCategory(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };

  /**
   * get all products by categoryId
   * @param {*} category 
   * @param {*} request 
   * @param {*} response 
   * @returns 
   */

  export const getCategoryAllProducts = async(category, request, response) => {
    const id = request.params.id;
    const categoryDb = await category.getCategoryAllProducts(id);
    if(!categoryDb){
      response.status(404).json({error:`you do not have a category with id ${id}`});
      return;
    }
    response.status(200).json(categoryDb);
  };
/**
 * get all product with promo dy category id
 * @param {*} category 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
  export const getCategoryProducts = async(category, request, response) => {
    const id = request.params.id;
    const categoryDb = await category.getCategory(id);
    if(!categoryDb){
      response.status(404).json({error:`you do not have a category with id ${id}`});
      return;
    }
    response.status(200).json(categoryDb);
  }
  /**
   * het all products by categoryId and tagId
   * @param {*} category 
   * @param {*} request 
   * @param {*} response 
   * @returns 
   */
  export const getCategoryProductsTags = async(category, request, response) => {
    const category_id = request.params.categoryId;
    const tags_id = request.params.tagId;
    const categoryDb = await category.getTags(category_id, tags_id);
    if(!categoryDb){
      response.status(404).json({error:`you do not have a category with id ${category_id}`});
      return;
    }
    response.status(200).json(categoryDb);
  }

<<<<<<< HEAD
=======
  // export const getPromoProducts = async(category, request, response) => {
  //   const category_id = request.params.categoryId;
  //   const promo_id = request.params.promoId;
  //   const categoryDb  = await category.getPromo(category_id, promo_id );
  //   if(!categoryDb ){
  //     response.status(404).json({error:`you do not have a promo with id ${promo_id}`});
  //     return;
  //   }
  //   response.status(200).json(categoryDb );
  // }
>>>>>>> 4d4ab60c06af6d3ae11d194590f2eb88e939bf11
  

