import { fetchBooksByGenre } from "../redux/thunk";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useState, useCallback, useRef } from "react";
import "../styles/list.css";
import { Book } from "../types/typesAndIntefraces";
import Filter from "./Filter";
import { resetBooks, setBook, setPage } from "../redux/booksSlice";
import LoaderReturner from "./LoaderReturner";
import { Link } from "react-router-dom";
import React from "react";

const BooksList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string | null>("");
  const [previousName, setPreviousName] = useState<string | null>("");
  const { books, page, totalItems, filter, loading } = useAppSelector(
    (state) => state.books
  );

  let genre = filter.genre;
  let sorting = filter.sort;

  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newName = event.target.value;
      setName(newName);
    },
    []
  );

  const handleFetchBooks = (event: React.FormEvent) => {
    event.preventDefault();
    if (name !== previousName) {
      dispatch(resetBooks());
      dispatch(fetchBooksByGenre({ genre, page, name, sorting }));
      setPreviousName(name);
    } else alert("Введите новое значение в запрос!")
  };

  const handleFetchMoreBooks = () => {
    dispatch(setPage(page + 1));
    dispatch(fetchBooksByGenre({ genre, page, name, sorting }));
  };

  const handleSetBook = (
    event: React.MouseEvent<HTMLDivElement>,
    book: Book | null | undefined
  ) => {
    event.preventDefault();
    dispatch(setBook({ book }));
  };

  return (
    <div className="container">
      <form onSubmit={handleFetchBooks}>
        <div className="main">
          <input
            className="input"
            placeholder="Введите название книги"
            type="text"
            id="filter"
            value={name as string}
            onChange={handleChangeName}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleFetchBooks(e);
              }
            }}
          />
          <button className="btn" type="submit">
            Найти
          </button>
        </div>
        <Filter />
      </form>
      {books && books.length > 0 && (
        <h2 style={{ color: "white" }}>Найдено результатов: {totalItems}</h2>
      )}
      <div className="books-container">
        {books &&
          books.length > 0 &&
          books.map((book: Book, index: number) => (
            <div
              className="book"
              key={index}
              onClick={(event) => handleSetBook(event, book)}
            >
              <Link
                to={`book/${
                  book &&
                  book.industryIdentifiers &&
                  book.industryIdentifiers[0] &&
                  book.industryIdentifiers[0].identifier
                }`}
              >
                <img
                  src={book?.imageLinks?.thumbnail}
                  alt={`${book.title}`}
                  className="book-img"
                  style={{ maxWidth: "150px", maxHeight: "250px" }}
                />
                <h2>{book.title}</h2>
              </Link>
              <h3>{book.publishedDate}</h3>
              <p>
                {book?.categories && book.categories.length > 0
                  ? book.categories[0]
                  : "Нет категории"}
              </p>
              <p>{book?.authors?.map((author: string) => author).join(", ")}</p>
            </div>
          ))}
        {loading && <LoaderReturner />}
        {totalItems}
      </div>
      {books && books.length > 0 ? (
        <button className="btn" type="button" onClick={handleFetchMoreBooks}>
          Загрузить ещё
        </button>
      ) : null}
    </div>
  );
};

export default React.memo(BooksList);
