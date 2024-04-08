import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/books/bookSlice';
import filterReducer from './slices/filters/filterSlice';
import errorReducer from './slices/errors/errorSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    filters: filterReducer,
    errors: errorReducer,
  },
});
export default store;
