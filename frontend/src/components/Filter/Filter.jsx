import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filters/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleTitleFilterChange = (event) => {
    dispatch(setTitleFilter(event.target.value));
  };
  const handleAuthorFilterChange = (event) => {
    dispatch(setAuthorFilter(event.target.value));
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  const handleOnlyFavoriteChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by type"
            onChange={handleTitleFilterChange}
            value={titleFilter}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author"
            onChange={handleAuthorFilterChange}
            value={authorFilter}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteChange}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};
export default Filter;
