import React, { useEffect, useState } from 'react';
import './KanbanBoard.css';
import CardComponent from './CardComponent'; // Import the new CardComponent

const KanbanBoard = ({ tickets, users, groupingOption, sortingOption }) => {
  const [groupedTickets, setGroupedTickets] = useState({});


  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "4":
        return 'Urgent';
      case "3":
        return 'High';
      case "2":
        return 'Medium';
      case "1":
        return 'Low';
      case "0":
      default:
        return 'No priority';
    }
  };

  useEffect(() => {
    // Function to group tickets based on the selected grouping option
    const groupTickets = () => {
      let grouped = {};
      tickets.forEach(ticket => {
        let groupKey;
        if (groupingOption === 'status') {
          groupKey = ticket.status;
        } else if (groupingOption === 'user') {
          groupKey = ticket.userId;
        } else if (groupingOption === 'priority') {
          groupKey = ticket.priority;
        }
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
      });
      return grouped;
    };

 // Function to sort tickets based on the selected sorting option
 const sortTickets = (grouped) => {
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        // Sort tickets by descending priority when sorting option is 'priority'
        if (sortingOption === 'priority') {
          return b.priority - a.priority; // Sort by descending priority (highest priority first)
        } else if (sortingOption === 'title') {
          return a.title.localeCompare(b.title);  // Sort by ascending title
        }
        return 0;
      });
    });
    return grouped;
  };

  // Update groupedTickets state based on grouping and sorting options
  setGroupedTickets(sortTickets(groupTickets()));
}, [tickets, groupingOption, sortingOption]);


  // Function to get user name by user id
  const getUserById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unassigned';
  };

  // Render function for Kanban columns
  const renderColumns = () => {
    return (
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(group => (
          <div key={group} className="kanban-column">
            <h2>{getColumnHeader(group)}</h2>
            {groupedTickets[group].map(ticket => (
              <CardComponent
              key={ticket.id}
              id={ticket.id}       // Show the ticket ID
              title={ticket.title} // Show the ticket title
              tag={ticket.tag}     // Assuming ticket has a tag property, else you can set this to some relevant value
              priority={getPriorityLabel(ticket.priority)} // Map priority to low, medium, high
            />
            
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getColumnHeader = (key) => {
    if (groupingOption === 'status') {
      return key;
    } else if (groupingOption === 'user') {
      return getUserById(key);
    } else if (groupingOption === 'priority') {
      return `${getPriorityLabel(key)}`;
    }
    return key;
  };

  return (
    <div className="kanban-board">
      {renderColumns()}
    </div>
  );
};

export default KanbanBoard;
