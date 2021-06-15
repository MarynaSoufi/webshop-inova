/**
 * All the CRUD endpoint actions together
 */

 import parseUsers from './parseUsers.js';
 import parseProfile from './parseProfile.js';
 import orderStatuses from '../orders/orderStatuses.js'

 /**
  * Getting the users
  *
  * @param {*} user
  * @param {*} request
  * @param {*} response
  */
 export const getUsers = async (user, request, response) => {
   try {
    response.status(200).json({ users: await user.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };
/**
 * get owm profile
 * @param {*} user 
 * @param {*} request 
 * @param {*} response 
 */
 export const getOwnProfile = async (user, request, response) => {
  try {
  const id = request.userId;
   response.status(200).json({ profile: await user.getProfile(id) });
  } catch({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};


 
//  /**
//   * register a new user
//   *
//   * @param {*} user
//   * @param {*} request
//   * @param {*} response
//   */
 export const addUser = async (user, request, response) => {
   try {
     const { email, password } = parseUsers(request, response);
     const newUser = await user.add(email, password);
     response.status(201).json({ user: newUser });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };

 /**
  * delete user
  * @param {*} user 
  * @param {*} request 
  * @param {*} response 
  */

 export const deleteUser = async (user, request, response) => {
  try {
    const id = request.userId;
    await user.delete(id);
    response.status(204).end();
  }
  catch({ message }) {
    response.status(500).json({ error: message });
  }
};
/**
  * Update an user
  *
  * @param {*} user
  * @param {*} request
  * @param {*} response
  */
 export const updateUser = async (user, request, response) => {
  try {
   const { email } = parseUsers(request, response);
   const { password } = parseUsers(request, response);
   const id = request.userId;
   const updatedUser = await user.update(id, email, password);
   response.status(200).json({ user: updatedUser });
  }
  catch({ message }) {
    response.status(500).json({ error: message });
  }
};
/**
 * updste email
 * @param {*} user 
 * @param {*} request 
 * @param {*} response 
 */
export const updateEmail = async (user, request, response) => {
  try {
   const { email } = request.body;
   const id = request.userId;
   const updatedUser = await user.updateEmail(id, email);
   if(updatedUser) {
    response.status(200).json({ email });
   } else {
     throw new Error("Error on updating user email.")
   }
   
  }
  catch({ message }) {
    response.status(500).json({ error: message });
  }
};
/**
 * update password
 * @param {*} user 
 * @param {*} request 
 * @param {*} response 
 */

export const updatePassword = async (user, request, response) => {
  try {
   const { password } = request.body;
   const id = request.userId;
   const updatedUser = await user.updatePassword(id, password);
   if(updatedUser) {
    response.status(200).json({ password });
   } else {
     throw new Error("Error on updating user password.")
   }
   
  }
  catch({ message }) {
    response.status(500).json({ error: message });
  }
};
/**
  * Update an user's profile
  *
  * @param {*} profile
  * @param {*} request
  * @param {*} response
  */
 export const updateUsersProfile = async (profile, request, response) => {
  try {
    const { firstName } = parseProfile(request, response);
    const { lastName} = parseProfile(request, response);
    const { mobileNumber} = parseProfile(request, response);
    const { addressLine} = parseProfile(request, response);
   const id = request.userId;
   const updatedUsersProfle = await profile.updateProfile(id, firstName, lastName, mobileNumber, addressLine);
   response.status(200).json({ profile: updatedUsersProfle });
  }
  catch({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
  * Get user's permissions by product
  *
  * @param {*} order
  * @param {*} request
  * @param {*} response
  */
 export const getPermissionsByProduct = async (order, request, response) => {
  try {
   const userId = request.userId;
   const productId = +request.params.id;
   //check whether user can review this product_id
   const userOrders = await order.getAllOrders(userId);
   const reviewable = !!userOrders.find(uo => uo.status == orderStatuses.delivered 
    && uo.products.some(p => p.product_id === productId));
   response.status(200).json({ reviewable });
  }
  catch({ message }) {
    response.status(500).json({ error: message });
  }
};


 