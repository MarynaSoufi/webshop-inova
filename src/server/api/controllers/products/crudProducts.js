
import parseProduct from './parseProduct.js';
/**
 * get all songs without authenticate
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

export const addProduct = async (product, request, response) => {
  try {
    const { description } = parseProduct (request, response);
    const newProduct = await product.add(description);
    response.status(201).json({ product: newProduct });
  } catch({ message }) {
    response.status(500).json({ error: message });
  }
};

