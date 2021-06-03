
/**
 * add trview
 * @param {*} review 
 * @param {*} request 
 * @param {*} response 
 */
export const addRev = async (review, request, response) => {
  try {
    const { description } = request.body;
    const id = request.params.productId;
    const id_user = request.userId;
    const newReview = await review.addReview(id, id_user, description);
    response.status(201).json({ review: newReview });
  } catch({ message }) {
    response.status(500).json({ error: message });
  }
};

