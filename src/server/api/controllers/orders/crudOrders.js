/**
 * place order
 * @param {*} order 
 * @param {*} request 
 * @param {*} response 
 */
export const placeOrder = async (database, request, response) => {
  try {
    const id_user = request.userId;
    const cart = await database.cart.getOwnCart(id_user);
    if(!cart || !cart.products || !cart.products.length){
      throw new Error("Cart is empty");
    }
    const createdOrder = await database.order.placeOrder(id_user, cart.products);

    await database.cart.deleteAll(cart.cart_id);
  
    response.status(201).json({ order: createdOrder });    
  } catch({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * get order by order_id
 * @param {*} req 
 * @param {*} res 
 */
 export const getOrder = async (order, req, res) => {
  try {
    const id_user = req.userId;
    const order_id = req.params.orderId;
    const orderDb = await order.getOrder(order_id, id_user);
    if (!order) throw new Error("order not found");
    res.status(200).json(orderDb);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};

/**
 * update order(staus sent)
 * @param {*} order 
 * @param {*} request 
 * @param {*} response 
 */
export const updateOrderSent = async (order, request, response) => {
  try {
    const id_user = request.userId;
    const order_id = request.params.orderId;
    const updateSent = await order.updateSent(id_user, order_id );
      response.status(200).json({ order: updateSent });
  } catch({ message }) {
      response.status(500).json({ error: message});
  }
};

/**
 * update order(status delivered)
 * @param {*} order 
 * @param {*} request 
 * @param {*} response 
 */
export const updateOrderDelivered = async (order, request, response) => {
  try {
    const id_user = request.userId;
    const order_id = request.params.orderId;
    const updateSent = await order.updateDelivered(id_user, order_id );
      response.status(200).json({ order: updateSent });
  } catch({ message }) {
      response.status(500).json({ error: message});
  }
};

<<<<<<< HEAD
export const getAllOrders = async (order, req, res) => {
  try {
    const id_user = req.userId;
    const orderDb = await order.getAllOrders(id_user);
    if (!order) throw new Error("order not found");
    res.status(200).json(orderDb);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};

=======
>>>>>>> 4d4ab60c06af6d3ae11d194590f2eb88e939bf11
