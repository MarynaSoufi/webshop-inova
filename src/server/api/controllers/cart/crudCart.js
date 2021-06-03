/**
 * get own cart
 * @param {*} cart 
 * @param {*} request 
 * @param {*} response 
 */
export const getCart = async (cart, request, response) => {
  try {
  const id = request.userId;
  const newCart = await cart.getOwnCart(id);
   response.status(200).json({ cart: newCart });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};
/**
 * get quantity products in the cart
 * @param {*} cart 
 * @param {*} request 
 * @param {*} response 
 */
export const getQuantity = async (cart, request, response) => {
  try {
  const id = request.userId;
  const product_id = request.params.productId;
  const newCart = await cart.getOwnCart(id);
  const quantity = await cart.getQuantity(newCart.cart_id, product_id);
   response.status(200).json({ cart: quantity });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};
/**
 * add product to cart
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const addProduct = async (product, request, response) => {
  try {
  const id_user = request.userId;
  const cart = await product.getOwnCart(id_user);
  const id = request.params.productId;
  const getQuantity = await product.getQuantity(cart.cart_id, id);
  const products = cart.products.map((p) => {
    return p.product_id;
   
  })
    if(products.indexOf(+id) === -1) {
      const newCart = await product.addProductToCart( id, cart.cart_id, 1);
      response.status(201).json({ cart : newCart});
    }else {
      const newCart = await product.update(id, cart.cart_id, getQuantity.quantity +1);
      response.status(200).json({ product: newCart });
    }
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * update product quantity(+)
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const updateCart = async (product, request, response) => {
  try {
      const id_user = request.userId;
      const id = request.params.productId;
      const getCart = await product.getOwnCart(id_user);
      const quantity = await product.getQuantity(getCart.cart_id, id);
      const newCart = await product.update(id, getCart.cart_id, quantity.quantity +1);
      response.status(200).json({ product: newCart });
  } catch({ message }) {
      response.status(500).json({ error: message});
  }
};
/**
 * update product quantity(-)
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const updateCartMin = async (product, request, response) => {
  try {
      const id_user = request.userId;
      const id = request.params.productId;
      const getCart = await product.getOwnCart(id_user);
      const quantity = await product.getQuantity(getCart.cart_id, id);
      if(quantity.quantity ===1) {
        const deleteProduct = await product.delete(getCart.cart_id, id);
        response.status(200).json({});
      }else {
        const newCart = await product.update(id, getCart.cart_id, quantity.quantity -1);
        response.status(200).json({ product: newCart });
      }
      
     
  } catch({ message }) {
      response.status(500).json({ error: message});
  }
};
/**
 * delete product from cart
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const deleteProduct = async (product,request, response) => {
  try {
      const id_user = request.userId;
      const product_id = request.params.productId;
      const getCart = await product.getOwnCart(id_user);
      const deleteProduct = await product.delete(getCart.cart_id, product_id);
      response.status(200).json({});
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};

/**
 * get all products in the cart
 * @param {*} product 
 * @param {*} request 
 * @param {*} response 
 */
export const deleteAllProducts = async (product,request, response) => {
  try {
      const id_user = request.userId;
      const getCart = await product.getOwnCart(id_user);
      const deleteProduct = await product.deleteAll(getCart.cart_id);
      response.status(200).json({});
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};

