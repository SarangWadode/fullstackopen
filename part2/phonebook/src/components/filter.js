const Filter = ({ value, handleChangeFilter }) => {
  return (
    <div>
      filter with:
      <input onChange={handleChangeFilter} value={value} />
    </div>
  );
};

export default Filter;
