const client = require('../client') //createusers may be moved to users.js
const { createUser } = require('./user')
const { createShoes } = require('./shoes')
const { createReview } = require('./reviews')
const { createOrders } = require('./orders')
const { createOrderProducts } = require('./order_products')



async function dropTables() {
  try {
    console.log('Dropping tables...') //delete later
    await client.query(
      `
     DROP TABLE IF EXISTS order_products;
     DROP TABLE IF EXISTS shoes;
     DROP TABLE IF EXISTS reviews;
     DROP TABLE IF EXISTS orders;
     DROP TABLE IF EXISTS users;
     `
    )
    console.log('Finished dropping tables') //delete later
  } catch (error) {
    console.error('There was an error dropping tables', error)
    throw error;
  }
}

async function createTables() {
  //Need to add pictures
  console.log("Creating tables") //delete later
  await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "isAdmin" BOOLEAN NOT NULL,
            "fullName" VARCHAR(255) UNIQUE NOT NULL,
            "creditCardInfo" INTEGER NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip INTEGER NOT NULL

        );         
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          status VARCHAR(255) DEFAULT 'open',
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
       );
      
       CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "shoeId" INT REFERENCES shoes(id),
          "orderId" INT REFERENCES orders(id),
          price INT NOT NULL,
          quantity INT NOT NULL DEFAULT O
       )
       `)
}





// DUMMY DATA BELOW


async function createInitialUsers() {
  try {
    console.log('Creating dummy data') //delete later
    console.log('Starting to create users') //delete later
    const dummyDataUserInfo = [
        {
            username: 'joey435',
            password: 'joeyinthematrix',
            email: 'joe374@gmail.com',
            isAdmin: true,
            fullName: 'jhoesephk antler',
            address: '123 bardnard st',
            creditCardInfo: '83473048',
            address:'dummydataddress1',
            city: 'Tyler',
            state: 'Texas',
            zip: "76543"
    
          },
          {
            username: 'beyonce',
            password: 'blueivy',
            email: 'yonce@gmail.com',
            isAdmin: false,
            fullName: 'Beyonce Knowles',
            address: '42nd street',
            creditCardInfo: '4759347',
            address: 'dummydataadress2',
            city: 'Manhattan',
            state: 'New York',
            zip: '10036'
          }
    ]
    const user = await Promise.all(dummyDataUserInfo.map(createUser))
    // console.log("Initial users created", user) //delete later
    return user;
  } catch (error) {
    console.error('Error creating dummy data users', error)
  }
}

async function createInitialShoes() {
  console.log("Starting to create intitial shoes"); //delete later
  const shoesToCreate = [
    {
      userId: '1', 
      username: 'beyonce',
      shoename: 'halos',
      description: 'these are the sneakers Beyonce use to run a mile in while singing',
      price: 536.85,
      type: "women's sneakers",
      size: 7,
    },
    {
      userId: '2',
      username: 'joey435',
      shoename: 'halo',
      description: 'good shoes',
      price: 5.00,
      type: "men's sandals",
      size: 10,
    }
  ]
  const shoes = await Promise.all(shoesToCreate.map(createShoes))
  // console.log("Initial Shoes Created: ", shoes); //delete later
  //console.log("Finished creating shoes"); //delete later 
  return shoes;

  }


async function createInitialReviews() {
  try {
    console.log('Starting to create reviews') //delete later
    const dummyDataReviewInfo = [ {
      authorId:'2',
      username:'joey435',
      rating:'4',
      comment:'These shoes are durable & comfy'
    }, 
    { 
      authorId:'1',
      username:'beyonce',
      rating:'5', 
      comment:'10/10 Recommend these kicks!'
     
    }]
    const reviews = await Promise.all(dummyDataReviewInfo.map(createReview))
    // console.log('Initial Reviews Created:', reviews) //delete later
    return reviews;
  } catch (error) {
    console.error('Error creating reviews', error)
  }
}

async function createInitialOrders() {
  try {
    console.log('Starting to create orders')
    const dummyOrders = [
      {
        status: 'open',
        userId: 1
      },
      {
        status: 'open',
        userId: 1
      },
      {
        status: 'closed',
        userId: 2
      },
      {
        status: 'open',
        userId: 2
      }
    ]
    const orders = await Promise.all(dummyOrders.map(createOrders))
    return orders
  } catch (error) {
    console.error('Error creating orders', error)
  }
}

async function createInitialOrderProducts() {
  try {
    console.log('Starting to create order_products')
    const dummyOrderProducts = [
      {
        shoeId: 2,
        orderId: 1,
        price: '79.99',
        quantity: 1
      },
      {
        shoeId: 1,
        orderId: 1,
        price: '179.99',
        quantity: 2
      },
      {
        shoeId: 1,
        orderId: 2,
        price: '79.99',
        quantity: 3
      },
      {
        shoeId: 2,
        orderId: 1,
        price: '79.99',
        quantity: 1
      }
    ]
    const orderProducts = await Promise.all(dummyOrderProducts.map(createOrderProducts))
    return orderProducts
  } catch (error) {
    console.error('Error creating orders_products', error)
  }
}


async function rebuildDB() {
    try {
        client.connect()
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialReviews()
        await createInitialShoes()
        await createInitialOrders()
        await createInitialOrderProducts()
    } catch(error){
       console.error("There was an error running rebuildDB", error)
    }
}

module.exports = {
  dropTables,
  createTables,
  rebuildDB, 
};
