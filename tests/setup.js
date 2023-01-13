const {createTables, dropTables } = require("../db/models/seedData");

const setup = async () => {
    console.log("--- JEST SETUP ---");
    await dropTables();
    await createTables();
}

module.exports = setup;