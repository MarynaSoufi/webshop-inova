
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

export const getProductsWithPromo = async (product, request, response) => {
  try {
    response.status(200).json({ products: await product.getAllProductsWithPromo() });
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

export const getProducts2 = async (database, request, response) => {
  try {
    response.status(200).json({ products: await database.Product.findAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

export const getProductByCategoryId = async (database, req, res) => {
	try {
		// Get productId parameter
		const { categoryId } = req.params;
		// Get specific product from database
		const product = await database.Product.findAll({
			where: {
				category_id: categoryId,
			},
		});
		// Send response
		res.status(200).json(product);
	} catch ({ message }) {
    res.status(500);
		res.json({ error: message });
	}
};

