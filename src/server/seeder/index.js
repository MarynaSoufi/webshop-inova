/**
* imports
*/

import faker from 'faker';
import Users from '../api/lib/UsersDb.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


const usersDB = new Users();
/**
 * Create an amount of users with Faker.js
 *
 * @param {Number} amount
 */
 const createUsers = async (amount) => {
  const users = [];
  let amountRaw = 0;
  while (amountRaw < amount) {
    const user = {
      email: faker.internet.email(),
      password: bcrypt.hashSync(faker.internet.password(), 10)
    };
    if (users.indexOf(user) < 0) {
      users.push(user);
      amountRaw++;
    }
  }
  return users;
};

/**
 * Seed the database
 *
 * @param {Array} users
 */
 const seedUsers = async (users) => {
  try {
    const ids = users.map(async (user) => {
      return await usersDB.runSeeder(user);
    });

    return Promise.all(ids); // if all insert promises are resolved, return the ids's.
  } catch (message) {
    return console.error(message);
  }
};

const seed = async () => {
  const users = await createUsers(38);
  const usersIds = await seedUsers(users);
  console.log(`Added ${usersIds.length} users to database`);

  // if all
  Promise.all(usersIds).then(() => {
    console.log(`Closing the seeder!`);
    process.exit();
  });
};
seed();
