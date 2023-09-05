import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/book.css";
import GoBackButton from "./GoBackButton";
import { setBook } from "../redux/booksSlice";

const BookCard: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { books, loading, oneBook } = useAppSelector((state) => state.books);

  const book =
    books &&
    books.find(
      (book) =>
        book &&
        book.industryIdentifiers &&
        book.industryIdentifiers[0] &&
        book.industryIdentifiers[0].identifier === id
    );

  console.log(book);

  useEffect(() => {
    if (id) {
      dispatch(setBook({ book }));
    } else console.log("Нет книги с таким ID");
  }, [id, dispatch]);

  return (
    <>
      {loading ? <div className="main">Загрузка...</div> : null}
      {oneBook && (
        <div className="book-card">
          <h1>{oneBook?.title}</h1>{" "}
          <h2>{oneBook?.authors.map((author: string) => author)}</h2>
          <p>{oneBook?.publishedDate}</p>
          <div className="cover-name">
            <img src={oneBook?.imageLinks.thumbnail} alt={book?.title} />
            <h6>{oneBook?.title}</h6>
          </div>
          <div className="info-desc">
            <p>Описание книги: </p>
            <p>{oneBook?.description}</p>
          </div>
          <div className="info-avg">
            <p>Количество страниц: {oneBook?.pageCount ?? "Неизвестно"}</p>
            <p>
              Категории:{" "}
              {oneBook?.categories.map((category: string) => category)}
            </p>
            <p>Средний рейтинг: {oneBook?.maturityRating}</p>
            <a className="link" href={oneBook?.previewLink}>
              Купить
            </a>
            <GoBackButton />
            <p>Вернуться обратно</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
