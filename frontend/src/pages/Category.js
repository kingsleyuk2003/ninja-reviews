import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

/* $id variable of type ID with exclamation showing that the $id property cannot be null */
const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      reviews {
        title
        body
        rating
        id
        categories {
          name
          id
        }
      }
    }
  }
`;

const Category = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div>
      <h2>{data.category.name}</h2>
      {data.category.reviews.map((review) => (
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

export default Category;
