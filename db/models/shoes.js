const client = require('../client');
// const { attachUserToShoe } = require('./user'); - This function needs to be written

async function createShoes({ userId, username, shoename, description, price, type, size, image }) {
    try{
        const {rows: [shoes]} = await client.query(`
                INSERT INTO shoes("userId", username, shoename, description, price, type, size, image)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `,[userId, username, shoename, description, price, type, size, image]);
            // console.log(shoes, "Here are your shoes")//delete later
            return shoes;
    }catch(error){
        console.error("There was an error creating shoes", error)
    }
}




async function getAllShoes () {
    try{
        const { rows : shoes } = await client.query(`
        SELECT * FROM shoes
        `)
        // console.log("Pulling all shoes", shoes) //delete later
        return shoes
    } catch(error){
        console.error("There was an error pulling all shoes", error)
    }
}




async function getShoesByUser({username}) {
    try{
        const { rows: [user] } = await client.query(`
            SELECT * 
            FROM users 
            WHERE username=$1;
        `, [username])
        const { rows: shoes } = await client.query(`
            SELECT shoes.*, users.username AS username
            FROM
            shoes
            JOIN users 
            ON shoes."userId"=users.id
            WHERE "userId"= ${user.id}
        `)
        // console.log("Getting shoes by username") //delete later
        return attachUserToShoe(shoes)
    } catch(error){
        console.error("There was an error getting shoes by username", error)
    }
}



async function getShoesById(id) { 
    try{
        const {rows: [shoes]} = await client.query(`
            SELECT *
            FROM shoes
            WHERE id=$1;
        `, [id])
        return shoes
    }catch(error){
        console.error("There was an error getting shoes by id", error)
    }
}



async function getShoesByPrice (price) {
    try{
        const { rows: shoes } = await client.query(`
            SELECT * 
            FROM shoes
            WHERE "price"=$1;
        `,[price])
        // console.log("Successfully got shoes by price", shoes)//delete later
        return shoes;
    }catch(error){
        console.error("Failed to fetch shoes by price", error)
    }
}



async function getShoesByType(type) {
    try{
        const { rows: shoes } = await client.query(`
            SELECT * 
            FROM shoes
            WHERE "type"=$1;
        `[type]);
        // console.log("Failed to get shoes by type(Mens, Womens, Children)", shoes)//delete later
        return shoes
    }catch(error){

    }
}



async function getShoesBySize(size) {
    try{
        const { rows: shoes } = await client.query(`
            SELECT * 
            FROM shoes
            WHERE "size"=$1; 
        `, [size]);
        // console.log("Successfully pulled shoes by shoe size", shoes) //delete later
        return shoes;
    }catch(error){
        console.error("There was an error pulling shoes by shoe size", error)
    }
}



async function updateShoes ({id, ...feilds}) {
    const setString = Object.keys(feilds)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(',');
    if (setString.length === 0) {
        return;
    }
    try{
        const { rows: [shoes], } = await client.query(`
            UPDATE shoes 
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(feilds)
        );
        // console.log("Successfully updated shoes", shoes) //delete later
        return shoes
    }catch(error){
        console.error("There was an error updating shoes", error)
    }
}




async function deleteShoes (id) {
    try{
        const { rows: [shoes],} = await client.query(`
            DELETE FROM shoes 
            WHERE id=${id}
            RETURNING *;
        `);
        // console.log("Deleted shoes successfully", shoes) //delete later
        return shoes
    } catch(error){
        console.error("There was an error deleting shoes")
        throw error;
    }
    
}




module.exports = {
    createShoes,
    getAllShoes,
    getShoesByUser,
    getShoesById, 
    getShoesByPrice,
    getShoesByType,
    getShoesBySize,
    updateShoes,
    deleteShoes,
}
