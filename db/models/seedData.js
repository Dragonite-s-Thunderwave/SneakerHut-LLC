const client = require('../client') //createusers may be moved to users.js
const { createUser } = require('./user')
const { createShoes } = require('./shoes')
const { createReview } = require('./reviews')
const { createOrders } = require('./orders')
const { createOrderProducts } = require('./order_products')



async function dropTables() {
  try {
    await client.query(
      `
      DROP TABLE IF EXISTS order_products cascade;     
      DROP TABLE IF EXISTS reviews cascade;     
      DROP TABLE IF EXISTS shoes cascade;
      DROP TABLE IF EXISTS orders cascade;
      DROP TABLE IF EXISTS users cascade;
     `
    )
  } catch (error) {
    console.error('There was an error dropping tables', error)
    throw error;
  }
}

async function createTables() {
  await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
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
          total DECIMAL (255,2) NOT NULL
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
            image VARCHAR(255),
            availability BOOLEAN DEFAULT TRUE
       );
      
       CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "shoeId" INT REFERENCES shoes(id),
          "orderId" INT REFERENCES orders(id),
          quantity INT NOT NULL DEFAULT 0  
       )
       `)
}





// DUMMY DATA BELOW


async function createInitialUsers() {
  try {
    const dummyDataUserInfo = [
        {
            username: 'joey435',
            password: 'joeyinthematrix',
            email: 'joe374@gmail.com',
            isAdmin: false,
            fullName: 'jhoesephk antler',
            creditCardInfo: '83473048',
            address:'123 bardnard st',
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
            creditCardInfo: '4759347',
            address: 'dummydataadress2',
            city: 'Manhattan',
            state: 'New York',
            zip: '10036',
    
          },
          {
            username: 'colin',
            password: 'ihaveacatnotadog',
            email: 'whoa@whoa.com',
            isAdmin: true,
            fullName: 'Colin Kaniff',
            creditCardInfo: '2342342',
            address: 'The Moon',
            city: 'The Moon',
            state: 'New York',
            zip: '1'
          }
    ]
    const user = await Promise.all(dummyDataUserInfo.map(createUser))
    return user;
  } catch (error) {
    console.error('Error creating dummy data users', error)
  }
}

async function createInitialShoes() {
  const shoesToCreate = [
    {
      userId: '2',
      username: 'Outdoors',
      shoename: 'The Alsakans',
      description: 'The epitome of chic style and comfort, the boots feature a ribbed-knit lining that adds warmth while creating the illusion of knitted socks.',
      price: 135.00,
      type: "Unisex Boots",
      size: 10,
      image: "https://bit.ly/3JjLCA5",
    },
    {
      userId: '3',
      username: 'Seanisacson',
      shoename: 'Ubersonic',
      description: 'These adidas Adizero Ubersonic 4 tennis shoes were designed to get you to the ball faster.',
      price: 112.00,
      type: "Women's Sneakers",
      size: 7,
      image: "https://bit.ly/3kSnY3b",
    },
    {
      userId: '1',
      username: 'Alien',
      shoename: 'Area 51s',
      description: 'The daring and dynamic COSMOS trainer is crafted in a combination of marl grey, black and white neoprene and leather.',
      price: 97.00,
      type: "Women's Sneakers",
      size: 9,
      image: "https://bit.ly/3Y2n7eI",
    },
    {
      userId: '1',
      username: 'Marvin123',
      shoename: 'Avacourt Shoes',
      description: 'The soft collar materials are designed to provide comfort.',
      price: 140.00,
      type: "Unisex Sneakers",
      size: 10,
      image: "https://bit.ly/3kSojTv",
    },
    {
      userId: '2',
      username: 'joey435',
      shoename: 'New Balances',
      description: 'These shoes are synonymous with the boundary defying New Balance style.',
      price: 57.00,
      type: "Men's Sneakers",
      size: 11,
      image: "https://bit.ly/3kMCBFo",
    }, 
    {
      userId: '1',
      username: 'Colin',
      shoename: 'Converse Hightops',
      description: 'New pair, never worn. Life changing!',
      price: 65.00,
      type: "Men's Sneakers",
      size: 9,
      image: "https://bit.ly/3HExq3h",
    }, 
    {
      userId: '1', 
      username: 'Beyonce',
      shoename: 'Halos',
      description: 'These exquisite heels were previously owned by Beyonce.',
      price: 5326.85,
      type: "Women's Heels",
      size: 7,
      image: "https://bit.ly/3JlXaCG",
    },
    {
      userId: '3',
      username: 'Texas Ted',
      shoename: 'Boots',
      description: 'These pair will get you through any kind of weather',
      price: 78.00,
      type: "Men's Cowboy Boots",
      size: 8,
      image: "https://bit.ly/3Rmk0w3",
    },
    {
      userId: '2',
      username: 'Aaliyah29',
      shoename: 'Jimmy Choos',
      description: 'Perfect wedding day kicks!',
      price: 2050.00,
      type: "Women's Platform Heels",
      size: 8,
      image: "https://bit.ly/3Y6D5Vi",
    },
    {
      userId: '3',
      username: 'Robert9032',
      shoename: 'Adidas Tennis Shoes',
      description: 'If you could only have one pair of sneakers, this could be them.',
      price: 123.00,
      type: "Men's Sneakers",
      size: 10,
      image: "https://bit.ly/3wDkjZL",
    },
    {
      userId: '1',
      username: 'Raethegreat',
      shoename: 'Uggs',
      description: 'Its like a hug but for your foot.',
      price: 63.70,
      type: "Women's Boots",
      size: 6,
      image: "https://bit.ly/3HO1Yjn",
    },
    {
      userId: '2',
      username: 'Jesus',
      shoename: '"Jandals"',
      description: 'These pair have literally walked on water',
      price: 57.00,
      type: "Men's Sneakers",
      size: 10,
      image: "https://bit.ly/3wDlVmk"
    }
  ]
  const shoes = await Promise.all(shoesToCreate.map(createShoes))
  console.log(shoes)
  return shoes;
  }


async function createInitialReviews() {
  try {
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
    return reviews;
  } catch (error) {
    console.error('Error creating reviews', error)
  }
}

async function createInitialOrders() {
  try {
    const dummyOrders = [
      {
        status: 'open',
        userId: 1,
        total: 39.99,
      },
      {
        status: 'open',
        userId: 1,
        total: 40.25,
      },
    ]
    const orders = await Promise.all(dummyOrders.map(createOrders))
    return orders
  } catch (error) {
    console.error('Error creating orders', error)
  }
}

async function createInitialOrderProducts() {
  try {
    const dummyOrderProducts = [
      {
        shoeId: 2,
        orderId: 1,
        quantity: 1
      },
      {
        shoeId: 1,
        orderId: 1,
        quantity: 2
      },
      {
        shoeId: 1,
        orderId: 2,
        quantity: 3
      },
      {
        shoeId: 2,
        orderId: 1,
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
