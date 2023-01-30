const express = require('express');
const { requireAdmin } = require('./utils')

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
} = require('../db/models/shoes') 
const shoesRouter = express.Router();

//admin must have full rights to make backend requests to add, edit, and remove products.


//GET 
shoesRouter.get("/", async (req, res) => {
    try {
        const shoes = await getAllShoes();
        res.send( shoes );
    } catch(error){
        console.error("There was an error fetching shoes", error)
    }
});

// shoesRouter.get("/:userId", async (req, res) => {
//     try{
//         const { userId } = req.params;
//         const shoe = await getShoesByUser(userId);
//         console.log("Getting shoes by their seller", shoe) //delete later
//         res.send(shoe)
//     }catch(error){
//         console.error("There was an error getting shoes by user",error)
//     }
// }
// )

shoesRouter.get("/:shoeId", async (req, res) => {
    try{
        const { shoeId } = req.params
        const shoe = await getShoesById(shoeId);
        res.send( shoe )
    }catch(error){
        console.error("There was an error getting shoes by ID", error)
    }
})

shoesRouter.get("/type/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const shoes = await getShoesByType(type);
        res.send({shoes})
    }catch(error){
        console.error("There was an error getting shoes by type", error)
    }
})

shoesRouter.get("/price/:price", async (req, res) => {
    try {
        const { price } = req.params;
        const shoes = await getShoesByPrice(price);
        res.send({shoes})
    }catch(error){
        console.error("There was an error getting shoes by type", error)
    }
})

shoesRouter.get("/size/:size", async (req, res) => {
    try {
        const { size } = req.params;
        const shoes = await getShoesBySize(size);
        res.send({ shoes, })
    }catch(error){
        console.error("There was an error getting shoes by type", error)
    }
})

//POST 

shoesRouter.post('/', requireAdmin, async (req, res, next) => {
    const {
        username,
        shoename,
        description,
        price,
        type,
        size
     } = req.body;
     const { userId } = req.user;
     console.log(req.body)
     try{
        const createingShoes = await createShoes({
            userId: userId,
            username: username,
            shoename: shoename,
            description: description,
            price: price,
            type: type,
            size: size,
         });
        res.send(createingShoes)
     }catch({ name, message }){
        next({ name, message});
     }
});



shoesRouter.post('/', requireAdmin, async (req, res, next) => {
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


shoesRouter.patch('/:shoesId', requireAdmin, async (req, res, next) => {
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

shoesRouter.delete('/:shoesId', requireAdmin, async (req, res, next) => {
    const id = Number(req.params.shoesId);
    try{
        const deletedShoes = await deleteShoes(id);
        res.send(deletedShoes);
    }catch({ name, message }){
        next({ name, message, status: 401});
    }
});






module.exports = shoesRouter;
