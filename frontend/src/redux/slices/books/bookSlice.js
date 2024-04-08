import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../../utils/createBookWithId';
import { setError } from '../errors/errorSlice';

const initialState = {
  books: [],
  isLoading: false,
};
export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const response = await axios.get(url);
      console.log(1);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((item) => item.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      const bookIndex = state.books.findIndex(
        (item) => item.id === action.payload
      );
      state['books'][bookIndex].isFavorite =
        !state['books'][bookIndex].isFavorite;
    },
  },
  selectors: {
    selectIsLoading: (state) => state.books.isLoading,
    selectBooks: (state) => state.books.books,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBookWithId(action.payload, 'API'));
  //     }
  //   });
  // },
  extraReducers: {
    [fetchBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
console.log(booksSlice);
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const { selectBooks, selectIsLoading } = booksSlice.selectors;
export default booksSlice.reducer;
