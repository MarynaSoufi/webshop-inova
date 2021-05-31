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
        // .where('WishListHasProducts.list_id', 'WishList.list_id', 'WishListHasProducts.list_id')
        .select("Products .*")
        order.products = products;
        return order;
    } catch (e) {
      return console.error(e.message);
    }
  }
  // async getOrder(id) {
  //   try {
  //     let order = (await knexWebShop('Orders').where("order_id", parseInt(id)))[0];
  //     const products = await knexWebShop('Products')
  //       .innerJoin("Categories", "Products.category_id", "Categories.category_id")
  //       .innerJoin("Promo", "Products.promo_id", "Promo.promo_id")
  //       .where("Products.category_id", id)
  //       .select("Products.*", "Promo.*");
  //     category.products = products;
  //     return category;
  //   } catch(e) {
  //    console.error(e.message);
  //   }
  // }

  async updateSent(user_id, order_id) {
    try {
        return await knexWebShop('Orders').where("order_id", order_id).where("user_id", user_id).update({ status: orderStatuses.sent   });
    } catch(e) {
      console.error(e.message);
    }
  }

  async updateDelivered(user_id, order_id) {
    try {
        return await knexWebShop('Orders').where("order_id", order_id).where("user_id", user_id).update({ status: orderStatuses.delivered   });
    } catch(e) {
      console.error(e.message);
    }
  }

  async getList(id) {
    try {
        const list = (await knexWebShop('WishList')
        .where('user_id', parseInt(id))
        .select('WishList .*'))[0];
        const products = await knexWebShop('Products')
        .innerJoin("WishListHasProducts", "WishListHasProducts.product_id", "Products.product_id")
        .innerJoin("WishList", "WishList.list_id", "WishListHasProducts.list_id")
        // .where('WishListHasProducts.list_id', 'WishList.list_id', 'WishListHasProducts.list_id')
        .select("Products .*")
        list.products = products;
        return list;
    } catch (e) {
      return console.error(e.message);
    }
  }

   /**
   * delete product from the list
   * @param {*} product_id 
   * @param {*} list_id 
   */
    async deleteProduct(product_id, list_id ) {
      try {
         await knexWebShop('WishListHasProducts')
         .where("product_id", product_id)
         .where("list_id", list_id )
         .del();       
      }catch (e){
          console.error(e.message);
      }
    }
  

  

  }
  
  


