import "./FilterSearch.css";
import React from "react";

interface FilterSearchComponentProps {
  handleLocationSearch: React.ChangeEventHandler<HTMLInputElement>;
  resetSearch: () => void;
  location: string;
  searchTotal: number | string;
}
export const FilterSearchComponent = ({
  handleLocationSearch,
  resetSearch,
  location,
  searchTotal,
}: FilterSearchComponentProps) => {
  return (
    <section className="filter-search">
      <section className="filter-search__container">
        <input
          placeholder="Use Filter to narrow Neighborhood dropdown search!"
          onChange={handleLocationSearch}
          name="filterInput"
          className="filter-search__input"
          value={location}
        />
        <button onClick={resetSearch} className="filter-search__reset">
          Reset Search Filter
        </button>

        <p className="filter-search__results">
          <span>Dropdown Results: {searchTotal}</span>
        </p>
      </section>
    </section>
  );
};
