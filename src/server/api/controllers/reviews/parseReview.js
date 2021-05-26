/**
 * A review parser to parse the incoming request
 */

 export default (request) => {
  const { review } = request.body;

  // validate if we have an user in the body
  if (review == null) {
    throw new Error('The review object was not set.');
  }

  // trim all the white/none characters in our string
  if (review.description != null) {
    review.description =review.descriptione.trim();
  }

  // return the parsed review
  return review;
}