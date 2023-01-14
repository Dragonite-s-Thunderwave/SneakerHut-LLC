require("dotenv").config();
const bcrypt = require("bcrypt");
const {faker} = require("@faker-js/faker")
const client = require("../../db/client");
const {
    getUser,
    createUser,
    getUserById,
    getUserByUsername
} = require("../../db/models/user");

const {createFakeUser} = require("../helpers");

describe("DB Users", () => {


    describe("createUser({username, password, email, fullName, address, city, state, zip})", () => {

        if("Creates the user", async () => {
            const fakeUserData = {
                username: "Butterbean",
                password: faker.internet.password(8),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            };

            const user = await createUser(fakeUserData);

            const queriedUser = await getUserById(user.id);

            expect(user.username).toBe(fakeUserData.username)
            expect(queriedUser.username).toBe(fakeUserData.username)
        });

        it("Hashes the password (salted 10 time) before storing it to the database", async () => {
            const fakeUserData = {
                username: "The_Abominable_Snowman",
                password: faker.internet.password(8),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            };

            const user = await createUser(fakeUserData);

            const {rows: [queriedUser]} = await client.query(`
                SELECT * FROM users
                WHERE id=$1
            `, [user.id]);

            const hashedVersion = await bcrypt.compare(
                fakeUserData.password,
                queriedUser.password
            );

            expect(hashedVersion).toBe(true);
        });

        it("Does NOT return the password", async () => {
            const fakeUserData = {
                username: "STACYS_mom",
                password: faker.internet.password(8),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            };

            const user = await createUser(fakeUserData);
            expect(user.password).toBeFalsy();
        });
    });

    describe("getUser({username, password})", () => {

        it("returns the user when the password is verified", async () => {
            const fakeUserData = {
                username: "AGoofyMovie",
                password: faker.internet.password(8),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            };
            
            await createUser(fakeUserData);

            const user = await getUser({
                username: "AGoofyMovie",
                password: faker.internet.password()
            });
            expect(user).toBeTruthy();
            expect(user.username).toBe(fakeUserData.username);
        });

        it("Does not return the user if the password doesn't verify", async () => {
            const fakeUserData = {
                username: "TommyBoy",
                password: faker.internet.password(8),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            };

            await createUser(fakeUserData);

            const user = await getUser({
                username: "TommyBoy",
                password: "BadPassword"
            });

            expect(user).toBeFalsy();
        });

        it("Does NOT return the password", async () => {
            const fakeUserData = {
                username: "ASimpleMan",
                password: faker.internet.password(8),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            };

            await createUser(fakeUserData);
            const user = await getUser({
                username: "ASimpleMan",
                passwowrd: faker.internet.password()
            });
            expect(user.password).toBeFalsy();
        });
    });

    describe("getUserById", () => {
        it("Gets a user based on the user Id", async () => {
            const fakeUser = await createFakeUser("Michaelangelo");
            const user = await getUserById(fakeUser.id);
            expect(user).toBeTruthy();
            expect(user.id).toBe(fakeUser.id);
        });

        it("does not return the password", async () => {
            const fakeUser = await createFakeUser("MyDad");
            const user = await getUserById(fakeUser.id);
            expect(user.password).toBeFalsy();
        })
    });

    describe("getUserByUsername", () => {
        it("Gets a user based on their username", async () => {
            const fakeUser = await createFakeUser("SylviaPlath");
            const user = await getUserByUsername(fakeUser.username);
            expect(user).toBeTruthy();
            expect(user.username).toBe(fakeUser.username);
        })

        it("Does not return the password", async () => {
            const fakeUser = await createFakeUser("AlecBaldwin");
            const user = await getUserByUsername(fakeUser.username);
            expect(user.password).toBeFalsy();
        })
    })
})