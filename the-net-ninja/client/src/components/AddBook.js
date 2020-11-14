import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutationQuery,
  getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
  const DisplayAuthors = () => {
    let { loading, error, data } = useQuery(getAuthorsQuery);
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

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });
  const { name, genre, authorId } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [addBook] = useMutation(addBookMutationQuery);
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = formData;
    console.log(formData);
    addBook({
      variables: { name: name, genre: genre, authorId: authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setFormData({ name: '', genre: '', authorId: '' });
  };

  return (
    <form id='add-book' onSubmit={onSubmit}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' name='name' value={name} onChange={onChange}></input>
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          name='genre'
          value={genre}
          onChange={onChange}
        ></input>
      </div>
      <div className='field'>
        <label>Author:</label>
        <select name='authorId' value={authorId} onChange={onChange}>
          <option>Select author</option>
          {DisplayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
