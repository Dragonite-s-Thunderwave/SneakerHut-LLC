require("dotenv").config()
const request = require("supertest")
const faker = require("faker")
const client = require("../../db/client")
const app = require("../../index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
    createFakeUserWithToken
} = require("../helpers")
const {
    expectToBeError,
    expectNotToBeError,
    expectToHaveErrorMessage
} = require("../expectHelpers")

const {JWT_SECRET = "thisIsASecret" } = process.env

const { objectContaining } = expect

const {createUser} = require("../../db/models/user")

const {
    UserTakenError,
    PasswordTooShortError,
    UnauthorizedError,
} = require("../../errors")

describe("/api/users", () => {
    describe("POST /api/users/register", () => {
        it("Creates a new user", async () => {
            //create fake user data
            const fakeUserData = {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }
        })
    })
})

