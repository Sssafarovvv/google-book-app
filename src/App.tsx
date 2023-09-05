import { Route, Routes } from "../node_modules/react-router-dom/dist/index";
import BookCard from "./components/BookCard";
import BooksList from "./components/BookList";
import { useAppSelector } from "./redux/store";

function App() {
  const { oneBook } = useAppSelector((state) => state.books);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/book/:id" element={oneBook && <BookCard />} />
      </Routes>
    </div>
  );
}

export default App;
