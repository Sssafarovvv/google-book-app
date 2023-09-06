import { genres, sorts } from "../types/constants";
import { useAppDispatch } from "../redux/store";
import { setGenre, setSort } from "../redux/booksSlice";
import { ChangeEvent } from "react";

const Filter = () => {
  const dispatch = useAppDispatch();

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    dispatch(setGenre(selectedGenre));
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as "newest" | "relevance";
    dispatch(setSort(selectedSort));
  };

  return (
    <>
      <select onChange={handleGenreChange}>
        {genres.map((genre: string) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <select onChange={handleSortChange}>
        {sorts.map((sorts: string) => (
          <option key={sorts} value={sorts}>
            {sorts}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
