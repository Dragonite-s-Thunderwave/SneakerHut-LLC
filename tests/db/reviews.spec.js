require("dotenv").config();
const bcrypt = require("bcrypt");
const {faker} = require("@faker-js/faker")

const {
    createReview,
    getAllReviews,
    getReviewByUsername,
    updateReview, 
    deleteReviewById,
    getReviewByRating
} = require("../../db/models/reviews");

const {createFakerReview} = require("../helpers");

describe("DB Reviews", () => {
  it("selects and returns an array of all reviews", async () => {
    await createFakeReview("Get shoes", "The kicks are ok");
    const reviews = await getAllReviews();
    const { rows: reviewsFromDatabase } = await client.query(`
    SELET * FROM reviews 
    `);
    expect(reviews).toEqual(reviewsFromDatabase);
  });
})

describe("getReviewsById", () => {
  it("gets reviews by their id", async () => {
    const fakeReview = await createFakeReview("love my dunks!", "my sketchers light up!");
    const review = await getReviewById(fakeReview.id);

    expect(review.id).toEqual(fakeReview.id);
    expect(review.username).toEqual(fakeReview.username);
    expect(review.rating).toEqual(fakeReview.rating);
    expect(review.comment).toEqual(fakeReview.comment);
  })
})

describe("getReviewByUsername", () => {
  it("gets a review by username", async () => {
    const fakeReview = await createFakeReview("my jordans were fake. don't order from them", "never received my order");
    const review = await getReviewByUsername(fakeReview.username);
    expect(review.id).toEqual(fakeReview.id);
  });
});

describe("createReview({username, rating, comment})", () => {
  it("Create and returns the new review", async () => {
    const reviewToCreate = {
      username:'beyonce',
      rating:'5', 
      comment:'10/10 Recommend these kicks!'
    };
    const createdReview = await createReview(reviewToCreate);
    expect(createdReview.username).toBe(reviewToCreate.username);
    expect(createdReview.rating).toBe(reviewToCreate.rating);
    expect(createdReview.comment).toBe(reviewToCreate.comment);
  });
});

describe("getReviewByRating", () => {
  it("gets review by rating", async () => {
    const fakeReview = await createFakeReview("4/5", "2/5");
    const review = await getReviewByRating(fakeReview.rating);
    expect(review.rating).toBe(fakeReview.rating);
  })
})

describe("updateReview", () => {
  it("Updates name without affecting the ID. Returns the updated Review.", async () => {
    const fakeReview = await createFakeReview("nike is the best", "yeezys all the way");
    const username = "beyonce";
    const updatedReview = await updateReview({
      id: fakeReview.id,
      username,
    });
    expect(updatedReview.id).toEqual(fakeUpdated.id);
    expect(updatedReview.username).toEqual(username);
    expect(updatedReview.rating).toEqual(fakeReview.rating);
    expect(updatedReview.comment).toEqual(fakeReview.comment);
  });

  it("Updates comment without affecting the Id. Returns the updated Review.", async () => {
    const fakeReview = await createFakeReview("reebok","k swiss");
    const updateReview = await updatedReview({
      id: fakeReview.id,
      username,
      rating,
      comment,
    });
    expect(updatedReview.id).toEqual(fakeUpdated.id);
    expect(updatedReview.username).toEqual(username);
    expect(updatedReview.rating).toEqual(fakeReview.rating);
    expect(updatedReview.comment).toEqual(fakeReview.comment);
  })
})

// add delete reviewById