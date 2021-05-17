/**
 * A Prodyctparser to parse the incoming request
 */

// We will receive an object like this:
// {
//  "product": {
//   "description": "the description"
//  }
// }

export default (request) => {
  const { product } = request.body;

  // validate if we have a todo in the body
  if (product == null) {
    throw new Error('The Product object was not set.');
  }

  // check if we have a description
  if (product.description == null || product.description.length === 0) {
    throw new Error('The Product object does not contain a description.');
  }

  // trim all the white/none characters in our string
  if (product.description != null) {
    product.description = product.description.trim();
  }

  // return the parsed todo
  return product;
}