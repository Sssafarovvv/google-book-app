import { GetBooksListResponse } from "../types/typesAndIntefraces";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
  params: {
    key: import.meta.env.GOOGLE_API_KEY as string,
  },
});

export const googleBooksApi = instance;

export const getBooksByGenre = async (
  genre: string | null,
  page: number,
  name: string | null,
  sorting: "newest" | "relevance"
) => {
  try {
    let queryString = `intitle:${name}`;

    if (genre && genre !== "all") {
      queryString += `+subject:${genre}`;
    }

    const response = await googleBooksApi.get<GetBooksListResponse>("volumes", {
      params: {
        q: queryString,
        startIndex: (page - 1) * 30,
        orderBy: sorting === "newest" ? "newest" : "relevance",
        maxResults: 30,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса к Google Books API:", error);
    throw error;
  }
};
