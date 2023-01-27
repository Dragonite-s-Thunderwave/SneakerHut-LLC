import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// do i need to create a Review Item page as well? import ReviewItem from "./ReviewItem";

const Reviews= ({ reviews, setReviews, token}) => {
  return ( <>
    {token ? <Link className="fluid ui button" to = "/Reviews/create">Create Review</Link> : null}
    <div>
    <h1>Reviews</h1>
      {reviews.map((review) => {
    return <ReviewItem
             key={review.id}
            reviews={review}
            setReviews={setReviews} />
      })}
    </div>
  </>)
};

export default Reviews;









