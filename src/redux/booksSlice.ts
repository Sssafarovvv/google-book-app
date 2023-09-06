import { fetchBooksByGenre } from "./thunk";
import { Book } from "../types/typesAndIntefraces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BooksState {
  books: Book[] | null;
  page: number;
  totalItems: number;
  loading: boolean;
  error: boolean;
  filter: {
    genre: string,
    sort: "newest" | "relevance"
  }
  oneBook?: Book | null;
}

const initialState: BooksState = {
  books: [],
  page: 1,
  totalItems: 0,
  loading: false,
  error: false,
  filter: {
    genre: "all",
    sort: "relevance"
  },
  oneBook: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.filter.genre = action.payload;
    },
    setSort: (state, action: PayloadAction<"newest" | "relevance">) => {
      state.filter.sort = action.payload;
    },
    setBook: (state, action: PayloadAction<{ book: Book | null | undefined }>) => {
      state.oneBook = action.payload.book;
    },
    resetBooks: (state) => {
      state.books = []
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksByGenre.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchBooksByGenre.fulfilled, (state, action) => {
        const { payload } = action;
        console.log(payload);
        state.loading = false;
        if (payload.totalItems > 0) {
          let foundBooks = payload.items.map((item) => item.volumeInfo);

          if (state.books === null) {
            state.books = foundBooks;
          } else {
            state.books = [...state.books, ...foundBooks];
          }
        }
        state.totalItems = payload.totalItems + state.totalItems;
        state.error = false;
      })
      .addCase(fetchBooksByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setPage, setGenre, setBook, setSort, resetBooks } = booksSlice.actions;

export default booksSlice.reducer;
