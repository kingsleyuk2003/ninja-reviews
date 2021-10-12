import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      id
      rating
      body
      id
      categories {
        id
        name
      }
    }
  }
`;

const Homepage = () => {
  const {loading, error, data}  = useFetch('http://localhost:1337/reviews')
  //const { loading, error, data } = useQuery(REVIEWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div>
      {data.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c) => {
            return <small key={c.id}>{c.name}</small>;
          })}

          <p>{review.body.substring(0, 200)}...</p>

          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
