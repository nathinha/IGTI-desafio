import React from 'react';

const SearchBox = ({ filter, onFilterChange }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  }

  return (
    <div className="section">
      <div className="row valign-wrapper">
        <div className="col l12 input-field">
          <input
            id="search"
            type="text"
            value={filter}
            onChange={handleFilterChange}
          />
          <label htmlFor="search">Buscar</label>
        </div>
      </div>
    </div>
  )
}

export default SearchBox;
