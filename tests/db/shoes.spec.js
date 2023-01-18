// require("dotenv").config();
// const bcrypt = require("bcrypt");
// import {faker} from "@faker-js-faker"
// //const client = require("../../db/client"); //may have to switch it to client 
// const client = require('../../db/models/shoes');
// const {
//     createShoes,
//     getAllShoes,
//     getShoesByUser,
//     getShoesById, 
//     getShoesByPrice,
//     getShoesByType,
//     getShoeBySize,
//     updateShoes,
//     deletShoes
// } = require("../../db");

// const { createInitialShoes } = require("../helpers");

// describe("DB Shoes", () => {

// describe("getAllShoes", () => {
//     it("Creates the shoes", async () => {
//       await createInitialShoes("780980", "issafakeusername", "nike6's", "nike runners 6th edition", 76.98, "men's running shoes", "10.5", true);
//       const shoes = await getAllShoes();
//       const { rows: shoesFromDatabase  } = await client.query(`
//         SELECT * FROM shoes;
//       `);
//       expect(shoes).toEqual(shoesFromDatabase);
    
//     });
//   });

// describe("getShoesById", () => {
//     it("gets shoes by their id", async () => {
//       const fakeShoes = await createInitialShoes("787830", "2ndfakeusername", "gogo's", "1975 vintage gogo boots", 975.00, "women's vintage shoes", "8.5", true);

//       const shoes = await getShoesById(fakeShoes.id);

//       expect(shoes.id).toEqual(fakeShoes.id);
//       expect(shoes.username).toEqual(fakeShoes.username);
//       expect(shoes.shoename).toEqual(fakeShoes.shoename);
//       expect(shoes.description).toEqual(fakeShoes.description);
//       expect(shoes.price).toEqual(fakeShoes.price);
//       expect(shoes.type).toEqual(fakeShoes.type);
//       expect(shoes.size).toEqual(fakeShoes.size);
//       expect(shoes.availability).toEqual(fakeShoes.availability);
//     });
//   });

// describe("getShoesByName", () => {
//     it("gets a pair of shoes by it's name", async () => {
//       const fakeShoes = await createInitialShoes("787830", "3rdfakeusername", "jesus sandals", "jandals, the same pair that walked on water", 994,847,745.00, "one size fits all", "3.5", true);
//       const shoes = await getShoesByName(fakeShoes.name);

//       expect(shoes.id).toEqual(fakeShoes.id);
//       expect(shoes.username).toEqual(fakeShoes.username);
//       expect(shoes.shoename).toEqual(fakeShoes.shoename);
//       expect(shoes.description).toEqual(fakeShoes.description);
//       expect(shoes.price).toEqual(fakeShoes.price);
//       expect(shoes.type).toEqual(fakeShoes.type);
//       expect(shoes.size).toEqual(fakeShoes.size);
//       expect(shoes.availability).toEqual(fakeShoes.availability);
//     });
//   });

// describe("createActivity({ name, description })", () => {
//     it("Creates and returns the new activity", async () => {
//       const activityToCreate = {
//         name: "Marathon",
//         description: "Run all the miles",
//       };
//       const createdActivity = await createActivity(activityToCreate);
//       expect(createdActivity.name).toBe(activityToCreate.name);
//       expect(createdActivity.description).toBe(activityToCreate.description);
//     });
//   });

// describe("updateActivity", () => {
//     it("Updates name without affecting the ID. Returns the updated Activity.", async () => {
//       const fakeActivity = await createFakeActivity("Baseball", "Run the bases");
//       const name = "Softball";
//       const updatedActivity = await updateActivity({
//         id: fakeActivity.id,
//         name,
//       });
//       expect(updatedActivity.id).toEqual(fakeActivity.id);
//       expect(updatedActivity.name).toEqual(name);
//       expect(updatedActivity.description).toEqual(fakeActivity.description);
//     });

//     it("Updates description without affecting the ID. Returns the updated Activity.", async () => {
//       const fakeActivity = await createFakeActivity("Soccer", "After school");
//       const description = "Football is life!";
//       const updatedActivity = await updateActivity({
//         id: fakeActivity.id,
//         description,
//       });
//       expect(updatedActivity.id).toEqual(fakeActivity.id);
//       expect(updatedActivity.name).toEqual(fakeActivity.name);
//       expect(updatedActivity.description).toEqual(description);
//     });
//   });
// });