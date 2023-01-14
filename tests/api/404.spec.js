//DO NOT CHANGE
require("dotenv").config();
const request = require("supertest");
const server = require("../../index");

describe("/api/unknown", () => {
    it("should return a 404", async (done) => {
        const response = await request(server).get("/api/unknown");
        expect(response.status).toEqual(404);
        // the 404 resonse return an object with a message property
        expect(typeof response.body.message).toEqual("string");
        done();
    });
})