import swaggerJsdoc  from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Webshop API for Associate Degree in Computer Programming',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/',
      description: 'Development server',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/server/api/controllers/products/productsEndpoints.js', './src/server/api/controllers/orders/ordersEndpoints.js', './src/server/api/controllers/reviews/reviewsEndpoints.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export {
  swaggerSpec,
}
