
/**
 * get all products without authenticate
 * @param {*} req 
 * @param {*} res 
 */
 export const getProducts = async (product, request, response) => {
  try {
    response.status(200).json({ products: await product.getAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * get products with promo
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const getProductsWithPromo = async (product, request, response) => {
  try {
    response.status(200).json({ products: await product.getAllProductsWithPromo() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};
/**
 * get one prodyct
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const getOneProduct = async (product, request, response) => {
  try {
    const id = request.params.id;
    console.log(id);
    response.status(200).json({ products: await product.getProduct(id) });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};
/**
 * get products by categoryId and tagIds
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const searchProducts = async (product, request, response) => {
  try {
    const searchQuery = {
      categoryId: request.query.categoryId,
      tagIds: Array.isArray(request.query.tagId) ? request.query.tagId : [request.query.tagId]
    }    
    response.status(200).json({ products: await product.search(searchQuery) });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};


