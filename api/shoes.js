const express = require('express');
const router = express.Router();

const {
    createShoes,
    getAllShoes,
    getShoesByUser,
    getShoesById, 
    getShoesByPrice,
    getShoesByType,
    getShoesBySize,
    updateShoes,
    deleteShoes
} = require('../db') 


const { requireAdmin } = require('./utils');
//admin must have full rights to make backend requests to add, edit, and remove products.


//GET 
router.get("/shoes", async (req, res) => {
    try {
        const shoes = await getAllShoes();
        console.log("Getting all shoes", shoes) //delete later
        res.send({ shoes, });
    } catch(error){
        console.error("There was an error fetching shoes", error)
    }
});

router.get("/:userId", async (req, res) => {
    try{
        const { userId } = req.params;
        const shoe = await getShoesByUser(userId);
        console.log("Getting shoes by their seller", shoe) //delete later
        res.send({shoe})
    }catch(error){
        console.error("There was an error getting shoes by user",error)
    }
}

)

router.get("/:shoesId", async (req, res) => {
    try{
        const { shoesId } = req.params
        const shoe = await getShoesById(shoesId);
        console.log("Getting shoes by their ID", shoe) //delete later
        res.send({ shoe })
    }catch(error){
        console.error("There was an error getting shoes by ID", error)
    }
})

router.get("/type/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const shoes = await getShoesByType(type);
        console.log("Getting shoes by type", shoes); //delete later
        res.send({shoes})
    }catch(error){
        console.error("There was an error getting shoes by type", error)
    }
})

router.get("/price/:price", async (req, res) => {
    try {
        const { price } = req.params;
        const shoes = await getShoesByPrice(price);
        console.log("Getting shoes by type", shoes); //delete later
        res.send({shoes})
    }catch(error){
        console.error("There was an error getting shoes by type", error)
    }
})

router.get("/size/:size", async (req, res) => {
    try {
        const { size } = req.params;
        const shoes = await getShoesBySize(size);
        console.log("Getting shoes by type", shoes); //delete later
        res.send({ shoes, })
    }catch(error){
        console.error("There was an error getting shoes by type", error)
    }
})

//POST 



router.post('/', requireAdmin, async (req, res, next) => {
    const { 
        userId, 
        username, 
        shoename, 
        description, 
        price, 
        type, 
        size
     } = req.body
     try{
        const newShoes = await createShoes({ userId, username, shoename, description, price, type, size });
        res.send(newShoes)
     }catch({ name, message }){
        next({ name, message, status: 401});
     }
});



//PATCH


router.patch('/:shoesId', requireAdmin, async (req, res, next) => {
    const id = Number(req.params.shoesId);
    const { userId, username, shoename, description, price, type, size } = req.body;

    try{
        const updatedShoes = await updateShoes({
            id: id,
            userId: userId, 
            username: username, 
            shoename: shoename, 
            description: description, 
            price: price, 
            type: type, 
            size: size, 
        });

        res.send(updatedShoes)
    }catch({ name, message }){
        next({ name, message, status: 401});
    }
})

//DELETE

router.delete('/:shoesId', requireAdmin, async (req, res, next) => {
    const id = Number(req.params.shoesId);
    try{
        const deletedShoes = await deleteShoes(id);
        res.send(deletedShoes);
    }catch({ name, message }){
        next({ name, message, status: 401});
    }
});






module.exports = router;
