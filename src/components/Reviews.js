import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import ReviewItem from "./ReviewItem";
import { fetchReviews } from '../axios-services';

// const Reviews= ({ reviews, setReviews, token}) => {
//   return ( <>
//     {token ? <Link className="fluid ui button" to = "/Reviews/create">Create Review</Link> : null}
//     <div>
//     <h1>Reviews</h1>
//       {reviews.map((review) => {
//     return <ReviewItem
//              key={review.id}
//             reviews={review}
//             setReviews={setReviews} />
//       })}
//     </div>
//   </>)
// };

// export default Reviews;




const Reviews = () => {
    const [reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        async function fetchSomeReviews() {
            try {
                const allReviews = await fetchReviews();
                console.log('allreviewssss', allReviews)
                setReviewsList(allReviews)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSomeReviews()
    }, [])

    console.log(reviewsList)
    const mappedReviews = reviewsList.map((review) => {
        return (
            <div>
                <div>
                    <p>Rating: {review.rating}</p>
                    <p>Comment: {review.comment}</p>

                </div>
            </div>
        )
    })
 
    return (
        <div>
            <h1>Reviews:</h1>
            <div>
                {mappedReviews}
            </div>
        </div>
    )
}




export default Reviews;