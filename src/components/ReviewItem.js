import React from "react";

const ReviewItem = ({reviews}) => {
  return (
    <div className="fluid ui card">
      <div className="content">
        <div className="center aligned header" style={{color: "white"}}>{reviews.id}</div>
        <div className="ui small feed">
          <div>Comment: {reviews.comment}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem;