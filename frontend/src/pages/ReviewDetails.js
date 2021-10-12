import React from 'react'
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown';


// $id: ID!  means that the passed $id from the useQuery hook into the gql query string, is of a special type ID and the exclamation mark enforces that the ID cannot be null
const REVIEW = gql`
  query GetReview($id: ID!) { 
    review(id: $id) {
      title ,body
      rating,
      id,
      categories{
        id,
        name
      }
    }
  }
`;
const ReviewDetails = () => {
   const { id } = useParams()
   //const { loading, error, data } = useFetch("http://localhost:1337/reviews/" + id);
   const { loading, error, data } = useQuery(REVIEW,{variables: {id: id}})
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div className="review-card">
        <div className="rating">{data.review.rating}</div>
        <h2>{data.review.title}</h2>

        {data.review.categories.map((c) => {
          return <small key={c.id}>{c.name}</small>;
        })}

        <ReactMarkdown>{data.review.body}</ReactMarkdown>
      </div>
    );
}

export default ReviewDetails
