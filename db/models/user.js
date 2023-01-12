// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

async function createUser({username, password, email, firstName, lastName, creditCardInfo, address, city, state, zip}) {
  try {
    const SALT_COUNT = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    const {rows: [user]} = await client.query(`
      INSERT INTO users (username, password, email, "firstName", "lastName", "creditCardInfo", address, city, state, zip)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (username, email) DO NOTHING
      RETURNING *;
      `, [username, hashedPassword, email, firstName, lastName, creditCardInfo, address, city, state, zip]);

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

async function getUserByFirstName(firstName) {
  try {
    const {rows: [user]} = await client.query(`
      SELECT "firstName", username
      FROM users
      WHERE "firstName"=$1
    `, [firstName])
  } catch(error) {
    throw error;
  }
}

async function getUserByLastName(lastName) {
  try {
    const {rows: [user]} = await client.query(`
      SELECT "lastName", username
      FROM users
      WHERE "lastName"=$1
    `, [lastName]);

    return user;
  } catch(error) {
    throw error;
  }
}

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