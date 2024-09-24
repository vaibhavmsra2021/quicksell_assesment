import React from 'react';

const GroupingOptions = ({ setGroupBy }) => {
  return (
    <div className="grouping-options">
      <label>Grouping</label>
      <select onChange={e => setGroupBy(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingOptions;
