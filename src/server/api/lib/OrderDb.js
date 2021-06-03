// import { use } from 'passport';
import knexWebShop from '../../db/knexWebShop.js'
import orderStatuses from '../controllers/orders/orderStatuses.js'


export default class OrderDb {
  /**
   * add product from cart to order(after pay)
   */

  async placeOrder(userId, products) {
    const createdOrderRow = await knexWebShop('Orders').insert({ user_id: userId, status: orderStatuses.paid});
    if(!createdOrderRow){
      throw new Error("Error on creating order");
    }
    const orderId = createdOrderRow[0];
      
    products.forEach(async p => 
      await knexWebShop('OrderHasProducts').where( {order_id: orderId}).insert({order_id: orderId, product_id: p.product_id, quantity: p.quantity}));
    
      return orderId;
  }

/**
 * get order by id
 * @param {*} id 
 * @returns 
 */
  async getOrder(id, user_id) {
    try {
        const order = (await knexWebShop('Orders')
        .where('order_id', parseInt(id))
        .where('user_id', parseInt(user_id))
        
        .select('Orders .*'))[0];
        const products = await knexWebShop('Products')
        .innerJoin("OrderHasProducts", "OrderHasProducts.product_id", "Products.product_id")
        .innerJoin("Orders", "Orders.order_id", "OrderHasProducts.order_id")
        .where('Orders.order_id', id)
        .select("Products .*", "OrderHasProducts.quantity")
        order.products = products;
        return order;
    } catch (e) {
      return console.error(e.message);
    }
  }

  /**
   * update order(status sent)
   * @param {*} user_id 
   * @param {*} order_id 
   * @returns 
   */
  async updateSent(user_id, order_id) {
    try {
        return await knexWebShop('Orders').where("order_id", order_id).where("user_id", user_id).update({ status: orderStatuses.sent   });
    } catch(e) {
      console.error(e.message);
    }
  }
/**
 * update order(status delivered)
 * @param {*} user_id 
 * @param {*} order_id 
 * @returns 
 */
  async updateDelivered(user_id, order_id) {
    try {
        return await knexWebShop('Orders').where("order_id", order_id).where("user_id", user_id).update({ status: orderStatuses.delivered   });
    } catch(e) {
      console.error(e.message);
    }
  }

  }
  
  


