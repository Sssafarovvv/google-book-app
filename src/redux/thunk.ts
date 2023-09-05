import { getBooksByGenre } from './api';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../types/typesAndIntefraces";

export const fetchBooksByGenre = createAsyncThunk(
  "books/fetchBooksByGenre",
  async ({ genre, page, name, sorting }: fetchData, thunkAPI) => {
    try {
      const response = await getBooksByGenre(genre, page, name, sorting);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
