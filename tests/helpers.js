const faker = require("faker");
const {createUser} = require("../db/models/user")
const jwt = require("jsonwebtoken");
const {JWT_SECRET = "thisIsASecret"} = process.env;
//Helper function to create fake data for the tests

const createFakeUser = async(username = faker.random.uuid()) => {
    const fakeUserData = {
        username,
        password: faker.internet.password(),
        email: faker.internet.email(),
        fullName: faker.name.fullName(),
        address: faker.address.streetAddress(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
    };

    const user = await createUser(fakeUserData);
    if (!user) {
        throw new Error("createUser didn't return a user");
    }

    return user;
};

const createFakeUserWithToken = async (username) => {
    const fakeUser = await createFakeUser(username);

    const token = jwt.sign(
        { id: fakeUser.id, username: fakeUser.username},
        JWT_SECRET,
        {expiresIn: "1y"}
    );

    return {
        fakeUser,
        token,
    }
}

module.exports = {
    createFakeUser,
    createFakeUserWithToken
}