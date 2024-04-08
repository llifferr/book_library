import { useSelector, useDispatch } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from '../../redux/slices/books/bookSlice';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filters/filterSlice';
import './BookList.css';

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const highlightMatch = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };
  const handleToggleIsFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesOnlyFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesOnlyFavorite;
  });
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No Books Available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++index}. {highlightMatch(book.title, titleFilter)} by{' '}
                  <strong>{highlightMatch(book.author, authorFilter)}</strong>(
                  {book.source})
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleIsFavorite(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default BookList;
