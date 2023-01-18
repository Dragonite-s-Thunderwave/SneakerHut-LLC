// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

async function createUser({username, password, email, fullName, creditCardInfo, address, city, state, zip}) {
  try {
    const SALT_COUNT = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    const { rows: [user]} = await client.query(`
      INSERT INTO users (username, password, email, "fullName", "creditCardInfo", address, city, state, zip)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
      `, [username, hashedPassword, email, fullName, creditCardInfo, address, city, state, zip]);

      delete user.password;

      return user;
  } catch(error) {
    throw error;
  }
};

async function getUser({username, password}) {
  /* this adapter should fetch a list of users from your db */
  try {
    const user = await getUserByUsername(username);

    const hashedPassword = user.password;

    const isValid = await bcrypt.compare(password, hashedPassword);

    if(isValid) {
      delete user.password;
      return user;
    } else {
      return null
    }

  } catch(error) {
    throw error;
  }
};

async function getUserById(userId) {
  try {
    const {rows : [user]} = await client.query(`
      SELECT id, username
      FROM users
      WHERE id=$1
    `, [userId]);

    if (!user) {
      return null;
    }

    return user;
  } catch(error) {
    throw error;
  }
}

// async function getUserByFullName(fullName) {
//   try {
//     const {rows: [user]} = await client.query(`
//       SELECT "full
//     `)
//   } catch(error) {
//     throw error;
//   }
// }

async function getUserByUsername(username) {
  try {
    const {rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1
    `, [username]);

    return user;
  } catch(error) {
    throw error;
  }
}


module.exports = {
  // add your database adapter fns here
  getUser,
  createUser,
  getUserById,
  getUserByUsername
};