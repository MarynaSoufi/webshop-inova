import request from 'supertest';
import { app } from '../src/server/index.js';

describe('test endpoints without authentication', () => {
  // it('should create a new user (signup)', async () => {
  //   const response = await request(app)
  //     .post('/users')
  //     .send({
  //       "user":{
  //         "email":"TestJest1",
  //         "password":"Jestuser"
  //       }
  //     })
  //     .set('Accept', 'application/json');
  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body).toHaveProperty('user');
  // })

  it('should get all products with promo', async () => {
    const response = await request(app)
      .get('/products/promo')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('products');
  })

  it('should get product by roducts id', async () => {
    const response = await request(app)
      .get('/products/1')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('products');
  })

  it('should get all categories ', async () => {
    const response = await request(app)
      .get('/categories')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('categories');
  })

  it('should get all products with promo by category id ', async () => {
    const response = await request(app)
      .get('/categories/1/promo_products')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('category_id');
  })

  it('should get all products by category id ', async () => {
    const response = await request(app)
      .get('/categories/1/all_products')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('category_id');
  })

  it('should get all promos ', async () => {
    const response = await request(app)
      .get('/promo')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('promos');
  })

  it('should get all tags ', async () => {
    const response = await request(app)
      .get('/tags')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('tags');
  })


})

describe('test our endpoints with HTTP-request role user', () => {
  let token = '';
  it('should return an access token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: "cardano@gmail.com",
        password: "toTheMoon"
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  })

  it('should get own wishlist', async () => {
    const response = await request(app)
      .get('/wishlist')
      .set('Accept', 'application/json')
      .set('Authorization',"Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('list_id');
  })

  // it('should add product to wishlist', async () => {
  //   const response = await request(app)
  //     .post('/wishlist/product/15')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);

  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body).toHaveProperty('product');
  // })

  // it('should add product to wishlist', async () => {
  //   const response = await request(app)
  //     .delete('/wishlist/product/10')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);
  //   expect(response.statusCode).toEqual(204);
  // })

  //   it('should add review to product by product id', async () => {
  //   const response = await request(app)
  //     .post('/reviews/product/2')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);

  //   expect(response.statusCode).toEqual(201);
  // })

  it('should get own cart', async () => {
    const response = await request(app)
      .get('/cart')
      .set('Accept', 'application/json')
      .set('Authorization',"Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('cart');
  })

  
  // it('should add product to cart', async () => {
  //   const response = await request(app)
  //     .post('/cart/product/15')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);

  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body).toHaveProperty('cart');
  // })

  it('should get quantity of product in the cart', async () => {
    const response = await request(app)
      .get('/cart/quantity/product/10')
      .set('Accept', 'application/json')
      .set('Authorization',"Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('cart');
  })

  // it('should update quantity of product(+1) in  the cart', async () => {
  //   const response = await request(app)
  //     .put('/cart/product/10')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);
  //   expect(response.statusCode).toEqual(200);
  // })

  
  // it('should update quantity of product(-1) in  the cart', async () => {
  //   const response = await request(app)
  //     .put('/cart/min/product/10')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);
  //   expect(response.statusCode).toEqual(200);
  // })

  // it('should delete product from cart', async () => {
  //   const response = await request(app)
  //   //you should check which id you have and wish to update
  //     .delete('/cart/product/1')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);

  //   expect(response.statusCode).toEqual(200);
   
  // })

    it('should get order by id', async () => {
    const response = await request(app)
    //you should check which id you have and wish to update
      .get('/orders/3')
      .set('Accept', 'application/json')
      .set('Authorization',"Bearer " + token);

    expect(response.statusCode).toEqual(200);
   
  })

  it('should get order by id', async () => {
    const response = await request(app)
    //you should check which id you have and wish to update
      .get('/orders/3')
      .set('Accept', 'application/json')
      .set('Authorization',"Bearer " + token);

    expect(response.statusCode).toEqual(200);
   
  })

  // it('should update order status', async () => {
  //   const response = await request(app)
  //   //you should check which id you have and wish to update
  //     .put('/orders/3/sent')
  //     .set('Accept', 'application/json')
  //     .set('Authorization',"Bearer " + token);

  //   expect(response.statusCode).toEqual(200);
   
  // })
})