const { client } = require('../client');

async function getAllReviews() {
  try {
  console.log('Getting reviews')
  const { rows: reviews } = await client.query(`
  SELECT * FROM reviews
  `);
  // console.log("Yay we got reviews", reviews) //delete later
  return reviews;
} catch (error) {
  throw error;
}
}

async function createReview({ authorId, username, rating, comment }) {
  try {
    const { rows: [review]} = await client.query(`
    INSERT INTO reviews("authorId", username, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [authorId, username, rating, comment]);
    // console.log(review, "Here are your reviews")//delete later
    return review
  } catch (error) {
    console.error('Error creating reviews');
    throw error;
  }
}

async function getReviewByUsername(username) {
  try {
    const { rows: [review] } = await client.query(`
    SELECT *
    FROM reviews
    WHERE username=$1;
    `, [username]);

    return review;
  } catch (error) {
    throw error;
  }
} 

async function updateReview (id, fields = {}) {

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(',');

  if (setString.length === 0) {
    return;
  }
  try {const {rows: [review]} = await client.query(`
  UPDATE reviews
  SET ${ setString} 
  WHERE id=${id}
  RETURNING *;
  `, Object.values(fields));

  return review;
} catch (error) {
  throw error;
}
  }

async function deleteReviewById(id) {
  try {
    const {rows: deletedReview} = await client.query(`
    DELETE FROM reviews
    WHERE id=$1
    RETURNING *;
    `, [id]);

    return deletedReview;
  } catch (error) {
    console.log('Error deleting the review');
    throw error;
  }
}

// unsure about this one
async function getReviewByRating(rating) {
  try {
    const {rows: [review]} = await client.query(`
    SELECT *
    FROM reviews
    WHERE rating=$1;
    `, [rating]);

    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewByUsername,
    updateReview, 
    deleteReviewById,
    getReviewByRating
}