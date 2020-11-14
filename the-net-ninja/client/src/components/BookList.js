import React from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

const BookList = () => {
  const DisplayBooks = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Ops! Something went wrong.</p>;
    return data.books.map((book, index) => {
      return <li key={index}>{book.name}</li>;
    });
  };

  return (
    <div>
      <ul id='book-list'>{DisplayBooks()}</ul>
    </div>
  );
};

export default BookList;
