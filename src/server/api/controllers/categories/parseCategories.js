/**
 * A Prodyctparser to parse the incoming request
 */

// We will receive an object like this:
// {
//  "ctaegory": {
//   "description": "the description"
//  }
// }

export default (request) => {
  const { category } = request.body;

  // validate if we have a todo in the body
  if ( category == null) {
    throw new Error('The Product object was not set.');
  }

  // check if we have a description
  if ( category.description == null ||  category.description.length === 0) {
    throw new Error('The Product object does not contain a description.');
  }

  // trim all the white/none characters in our string
  if ( category.description != null) {
    category.description =  categoryt.description.trim();
  }

  // return the parsed todo
  return product;
}