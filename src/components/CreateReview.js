import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReviews } from "../axios-services";

const CreateReview =({createReviews}) => {

    const history = useHistory();
    const [name, setName] = useState("")
    const [comment, setComment] = useState("");

    return(
        <div>
            <form onSubmit={async (event) =>{
                event.preventDefault();

                const result = await createReviews(name, comment)

                setReviews((prevReviews) => [...prevReviews, result]);
                setName("");
                setComment("");
                history.push("/Reviews")
            }}>
                <h4>Create Your Own Review</h4>
                <div>
                    <label htmlFor="name">Name Of Review</label>
                    <input
                    onChange={(event) => {setName(event.target.value)}}
                    value={name}
                    type="text"
                    placeholder="Name Your Review!"
                    required
                    ></input>
                </div>
                

                <div>
                <label htmlFor="name">In a few words, tell us about the shoes</label>
                    <input
                    onChange={(event) => {setComment(event.target.value)}}
                    value={comment}
                    type="text"
                    placeholder="Comment!"
                    required
                    ></input>
                </div>

                <button type="submit">Create Review</button>
            </form>
        </div>
    )
        }
export default CreateReview;