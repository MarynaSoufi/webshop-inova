export default (request) => {
  try {
      const { product_id, list_id } = request.body;
      console.log(request.body);
      if(!product_id) {
          throw new Error("The product id was not set");
      }
      if(!list_id) {
        throw new Error("The list id was not set");
      }
      let parsedObj = { product_id, list_id };
      if(request.userId) {
          parsedObj.userId = request.userId;
      }

      return parsedObj;
      
  } catch (e) {
      throw new Error('Something went wrong... ')
  }
  
}