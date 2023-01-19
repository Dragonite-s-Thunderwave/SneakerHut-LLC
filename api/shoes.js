const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;
// const { requireAdmin } = require("./utils");
const {
    createShoes,
    getAllShoes,
    getShoesByUser,
    getShoesById, 
    getShoesByPrice,
    getShoesByType,
    getShoeBySize,
    updateShoes,
    deleteShoes
} = require('../db') //may need to be changed

//GET /api/shoes

router.get("/", async (req, res, next) => {
    try {
        console.log("Getting all shoes", shoes)
    } catch(error){
        console.error("There was an error fetching shoes", error)
    }
});

//POST /api/shoes
// router.post("/", requireAdmin, async (req, res, next)
router.post('/', )

module.exports = router;
