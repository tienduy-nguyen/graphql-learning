import React from 'react';
import { gql, useQuery } from '@apollo/client';

const getAuthorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const DisplayAuthors = () => {
  let { loading, error, data } = useQuery(getAuthorQuery);
  if (loading) return <option>Loading...</option>;
  if (error) return <p>Ops! Something went wrong.</p>;
  return data.authors.map((author) => {
    return (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    );
  });
};
const AddBook = () => {
  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book name:</label>
        <input type='text'></input>
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text'></input>
      </div>
      <div className='field'>
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {DisplayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
