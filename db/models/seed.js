const {client} = require("../client");
const { rebuildDB } = require("./seedData");

client.connect()
  .then(rebuildDB)
  .catch(console.error)
  .finally(() => client.end());

