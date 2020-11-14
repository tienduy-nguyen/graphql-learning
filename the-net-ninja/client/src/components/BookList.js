import React from 'react';
import { gql, useQuery } from '@apollo/client';

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const DisplayBooks = () => {
  const { loading, error, data } = useQuery(getBookQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Ops! Something went wrong.</p>;
  return data.books.map((book, index) => {
    return <li key={index}>{book.name}</li>;
  });
};

const BookList = () => {
  return (
    <div>
      <ul id='book-list'>{DisplayBooks()}</ul>
    </div>
  );
};

export default BookList;
