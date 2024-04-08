import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import {
  addBook,
  fetchBook,
  selectIsLoading,
} from '../../redux/slices/books/bookSlice';
import { setError } from '../../redux/slices/errors/errorSlice';
import booksData from '../../data/books.json';
import './BookForm.css';
import createBookWithId from '../../utils/createBookWithId';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && author) {
      const book = createBookWithId({ title, author }, 'manual');
      dispatch(addBook(book));
    } else {
      dispatch(setError('You must to fill fields '));
    }
    setAuthor('');
    setTitle('');
  };
  const handleAddRandomBook = (event) => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = { ...booksData[randomIndex] };
    const book = createBookWithId(randomBook, 'random');
    dispatch(addBook(book));
  };
  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
  };
  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random Book
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add Random via API'
          )}
        </button>
      </form>
    </div>
  );
};
export default BookForm;
