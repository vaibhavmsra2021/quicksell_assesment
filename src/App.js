import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';

import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);  // State for tickets
  const [users, setUsers] = useState([]);      // State for users
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem('groupingOption') || 'status');  // Persistent grouping state
  const [sortingOption, setSortingOption] = useState(localStorage.getItem('sortingOption') || 'priority');   // Persistent sorting state

  // Fetch data from the API
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTickets(Array.isArray(data.tickets) ? data.tickets : []);
          setUsers(Array.isArray(data.users) ? data.users : []);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setTickets([]);
        setUsers([]);
      });
  }, []);

  // Save the grouping option to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
  }, [groupingOption]);

  // Save the sorting option to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('sortingOption', sortingOption);
  }, [sortingOption]);

  // Function to handle grouping option change
  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  // Function to handle sorting option change
  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>

    <div className="appclassgroup">

      {/* Grouping Option */}
      <div class="app_group">
        <label htmlFor="grouping">Grouping </label>
        <select id="grouping" value={groupingOption} onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Sorting Option */}
      <div>
        <label htmlFor="sorting">Ordering </label>
        <select id="sorting" value={sortingOption} onChange={handleSortingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard 
        tickets={tickets} 
        users={users} 
        groupingOption={groupingOption} 
        sortingOption={sortingOption} 
      />
    </div>
  );
}

export default App;
