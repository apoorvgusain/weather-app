const SearchInput = ({ handleSearch, searchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search cities..."
      onChange={handleSearch}
      value={searchTerm}
    />
  );
};

export default SearchInput;
