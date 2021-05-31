
/**
 * get all promo without authenticate
 * @param {*} req 
 * @param {*} res 
 */
 export const getPromo = async (promo, request, response) => {
  try {
    response.status(200).json({ promos: await promo.getAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

export const getAllPromo = async (database, request, response) => {
  try {
    response.status(200).json({ promo: await database.Promo.findAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};
