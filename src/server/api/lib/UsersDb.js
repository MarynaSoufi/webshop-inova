/**
 * writing to and getting data from db
 */

 import knexWebShop from '../../db/knexWebShop.js'
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';
dotenv.config();

 export default class UsersDb {
   /**
    * Adds a user to our database
    * @param {string} email
    * @param {string} password
    */

    async add(email, password) {
     try {
       const userAddedResult = await knexWebShop('Users').insert({ email: email, password: bcrypt.hashSync(password, 10)});
       await knexWebShop('Profiles').insert({ user_id: userAddedResult[0]});
       await knexWebShop('Cart').insert({ user_id: userAddedResult[0]});
       await knexWebShop('WishList').insert({ user_id: userAddedResult[0]});

       return userAddedResult;
     } catch (e) {
       return console.error(e.message);
     }
   }
 
   /**
    * Updates an existing user
    *
    * @param {int} id
    * @param {string} email
    * @param {string} password
    */
   async update(id, email, password) {
     try {
       return await knexWebShop('Users').where('user_id', id).update({email: email, password:bcrypt.hashSync(password, 10)});
     } catch (e) {
       console.error(e.message);
     }
   }

   async updateEmail(id, email) {
    try {
      return await knexWebShop('Users').where('user_id', id).update({email: email});
    } catch (e) {
      console.error(e.message);
    }
  }

  async updatePassword(id, password) {
    try {
      return await knexWebShop('Users').where('user_id', id).update({password: bcrypt.hashSync(password, 10)});
    } catch (e) {
      console.error(e.message);
    }
  }
  
   /**
    * User Deletes own account 
    *
    * @param {int} id
    */
    async delete(id) {
     try {
       const userDeleted = await knexWebShop('Users').where('user_id', parseInt(id)).del();
       await knexWebShop('Profiles').where('user_id', parseInt(id)).del();
       await knexWebShop('Cart').where('user_id', parseInt(id)).del();
       await knexWebShop('WishList').where('user_id', parseInt(id)).del();
       return userDeleted;
     } catch (e) {
       return console.error(e.message);
     }
   }
   async getUser(id) {
     try {
       return await knexWebShop('Users')
         .where('user_id', parseInt(id) )
     } catch (e) {
       return console.error(e.message);
     }
   }
   /**
    * get all users from db table users
    */
   async get() {
     try {
       return await knexWebShop('Users').select('*');
     }
     catch (err) {
       console.error(err.message);
     }
   }

   async getProfile(id) {
     try{
      return await knexWebShop('Profiles').where('user_id', parseInt(id)).select('*');
     }
     catch (err) {
      console.error(err.message);
    }
   }

    /**
    * Updates an existing user's profile
    *
    * @param {int} id
    * @param {string} firstName
    * @param {string} lastName
    * @param {string} mobileNumber
    * @param {string} addressLine
    */
    async updateProfile(id, firstName, lastName, mobileNumber, addressLine) {
      try {
        return await knexWebShop('Profiles').where('user_id', id).update({firstName: firstName, lastName:lastName, mobileNumber: mobileNumber, addressLine: addressLine});
      } catch (e) {
        console.error(e.message);
      }
    }
   async runSeeder(data) {
    try {
       return await knexWebShop('Users').insert(data);
     } catch (e) {
       return console.error(e.message);
     }
   }

   async findOne(email) {
    try {
      return await knexWebShop('Users')
        .where({ email: email })
        .select('*')
        .first();
    } catch (e) {
      return console.error(e.message);
    }
  }
 }