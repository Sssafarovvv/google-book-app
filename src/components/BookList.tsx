import { fetchBooksByGenre } from "../redux/thunk";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import "../styles/list.css";
import { Book } from "../types/typesAndIntefraces";
import Filter from "./Filter";
import { resetBooks, setBook, setPage } from "../redux/booksSlice";
import LoaderReturner from "./LoaderReturner";
import { Link } from "react-router-dom";

const BooksList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string | null>("");
  const { books, page, totalItems, filter, loading } = useAppSelector(
    (state) => state.books
  );

  console.log(books)

  let genre = filter.genre
  let sorting = filter.sort

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const handleFetchBooks = (event: any) => {
    event.preventDefault();
    dispatch(resetBooks())
    dispatch(fetchBooksByGenre({ genre, page, name, sorting }));
    console.log(books);
  };

  const handleFetchMoreBooks = (event: any) => {
    event.preventDefault();
    dispatch(setPage(page + 1));
    dispatch(fetchBooksByGenre({ genre, page, name, sorting }));
  };

  useEffect(() => {
    if (name && books && books.length > 0) dispatch(fetchBooksByGenre({ genre, page, name, sorting }));
  }, [genre])

  const handleSetBook = (event: any, book: Book | null | undefined) => {
    event.preventDefault();
    dispatch(setBook({book}))
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
          />
          <button className="btn" type="submit">
            Найти
          </button>
        </div>
        <Filter />
      </form>
      {books && books?.length > 0 ? (
        <h2 style={{ color: "white" }}>Найдено результатов: {totalItems}</h2>
      ) : (
        <h2 style={{ color: "white" }}>Не найдено результатов</h2>
      )}
      <div className="books-container">
        {books &&
          books.length > 0 &&
          books.map((book: Book) => (
            <div className="book" key={book.canonicalVolumeLink} onClick={(event) => handleSetBook(event, book)}>
              <Link to={`book/${book && book.industryIdentifiers && book.industryIdentifiers[0] && book.industryIdentifiers[0].identifier}`}>
              <img
                src={book?.imageLinks?.thumbnail}
                alt={`${book.title}`}
                className="book-img"
              />
              <h2>{book.title}</h2>
              </Link>
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

export default BooksList;
