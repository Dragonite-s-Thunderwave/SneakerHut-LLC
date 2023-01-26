const express = require('express');
const { getAllReviews } = require('../db/models/reviews');

const router = express.Router();
const {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  getReviewByUsername,
  getReviewByRating
} = require('../db')

router.get('/', async (req, res, next) => {
  try {
  const {allReviews} = await getAllReviews();
  res.send(allReviews)
  } catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
 const {username, rating, comment} = req.body;

  try {
    let existingReview = await getReviewByUsername(username);

    if(existingReview) {
      next({
        error: "A review with this name already exists",
        username: "A review with this name already exists",
        message: "A review with username ${username} already exists"
      });
    } else {
      let newReview = await createReview({
        username: username,
        rating: rating,
        comment: comment
      });
      if(newReview) {
        res.send(newReview)
      } else {
        next ({
          name: "ReviewError",
          message: "Unable to send Review"
        })
    }
    }} catch (error) {
      next(error)
    }
})

router.patch('/:reviewId', async (req, res, next) => {
    const {username, rating, comment} = req.body;
    const {reviewId} = req.params;
    
    try {
        const reviewRating = await getReviewByRating(rating);
        const reviewFromId = await getReviewById(reviewId);

        if(!reviewFromId) {
            res.status(401);
            res.send({
                error: "ReviewIdError",
                name: "Review by that ID does not exist",
                message: `Review ${reviewId} not found`
            });
        } else if(reviewRating) {
            res.status(401);
            res.send({
                error: "ReviewRatingError",
                name: "Review by that rating already exists",
                message: `A review with rating ${rating} already exists`
            })
        } else {
            const updatedReview = await updateReview({
                id: reviewId,
                rating: rating,
                comment: comment
            });
            res.send(updatedReview);
        }
    } catch(error) {
        next(error);
    }

})

module.exports = router;