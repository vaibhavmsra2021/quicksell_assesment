import React from 'react';

const SortingOptions = ({ setSortBy }) => {
  return (
    <div className="sorting-options">
      <label>Ordering</label>
      <select onChange={e => setSortBy(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingOptions;
