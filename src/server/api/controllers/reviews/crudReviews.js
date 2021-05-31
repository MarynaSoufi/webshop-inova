import parseReview from './parseReview.js';

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

export const getAllReviews = async (database, request, response) => {
  try {
    response.status(200).json({ reviews: await database.Review.findAll() });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};