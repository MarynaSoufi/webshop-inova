
/**
 * add product to wishlist
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const addProduct = async (product, request, response) => {
  try {
    const id_user = request.userId;
    const wishList = await product.getList(id_user);
    const id = request.params.productId;
    const newProduct = await product.addProduct(id, wishList.list_id);
    response.status(201).json({ product: newProduct });
  } catch({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * get own wishLIst
 * @param {*} req 
 * @param {*} res 
 */
 export const getOwnWishList = async (list, req, res) => {
  try {
    const id_user = req.userId;
    const wishList = await list.getList(id_user);
    const id = request.params.productId;
    if (!wishList) throw new Error("wishList not found");
    res.status(200).json(wishList);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};

/**
 * delete product from the wishlist
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
 export const deleteProduct = async (list, request, response) => {
  try {
      const id_user = request.userId;;
      const wishList = await list.getList(id_user);
      const id = request.params.productId;
     
      if(!wishList) {
        response.status(404).json({ error: `User doesn't have wishlist ` });
        return;
      }
        const del = await list.deleteProduct(id, wishList.list_id);
        response.status(204).end();
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};
