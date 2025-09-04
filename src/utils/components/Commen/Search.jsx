import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search for communities and opportunities"}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;