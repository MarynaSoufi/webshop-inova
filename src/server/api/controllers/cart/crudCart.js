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

export const addProduct = async (cart, request, response) => {
  try {
  const productId = request.params.productId;
  const quantity = request.body.quantity;
  const cartId = request.body.cartId;

  const newCart = await cart.addProductToCart(cartId, productId, quantity);
  response.status(201).json({ cart : newCart});
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};