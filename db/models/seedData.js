const {client, createUser} = require('./index') //createusers may be moved to users.js

async function dropTables() {
  try {
    console.log('Dropping tables...')
    //NEED to be dropped in the correct order
    //NEED to change names of databases
    //Might be missing some tables
    await client.query(
      `
     DROP TABLE IF EXISTS shoes;
     DROP TABLE IF EXISTS reviews;
     DROP TABLE IF EXISTS order;
     DROP TABLE IF EXISTS users`
    )
    console.log('Finished dropping tables')
  } catch (error) {
    console.error('There was an error dropping tables', error)
  }
}

async function createTables() {
  //Need to add pictures
  await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            "creditCardInfo" INTEGER NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip INTEGER NOT NULL

        );         
        CREATE TABLE order(
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "isComplete" VARCHAR NOT NULL,
          total DECIMAL (255,2) NOT NULL,
          "orderDate" DATE NOT NULL
        );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          username VARCHAR(255) UNIQUE NOT NULL,
          rating SMALLINT NOT NULL CHECK(rating BETWEEN 1 AND 5),
          comment TEXT NOT NULL
         );

       CREATE TABLE shoes (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            username VARCHAR(255) UNIQUE NOT NULL, 
            shoename VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            price MONEY NOT NULL,
            type VARCHAR(255) NOT NULL,
            size INTEGER NOT NULL,
            availability BOOLEAN DEFAULT true
        `)
}

/// DUMMY DATA BELOW// - Could be moved to seedData.js and then imported for simplicity

async function createInitialUsers() {
  try {
    console.log('Starting to create dummy data')
    const dummyDataUserInfo = [
        {
            username: 'joey435',
            password: 'joeyinthematrix',
            email: 'joe374@gmail.com',
            name: 'jhoesephk antler',
            address: '123 bardnard st, 76543, Tyler,Tx',
            creditCardInfo: 'idk what to put in here',
            city: 'Tyler',
            state: 'Texas',
            zip: "76543"
    
          },
          {
            username: 'beyonce',
            password: 'blueivy',
            email: 'yonce@gmail.com',
            name: 'Beyonce Knowles',
            address: '42nd street, NY 10036',
            creditcard: 'idk what to put in here as well',
            city: 'Manhattan',
            state: 'New York',
            zip: '10036'
          }
    ]
    await createUser({
      //needs to be imported/required
    })
  } catch (error) {
    console.error('Error creating dummy data users', error)
  }
}


module.exports = {
  dropTables,
  createTables,
  createInitialUsers
}
