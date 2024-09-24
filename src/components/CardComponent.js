import React from 'react';
import './CardComponent.css'; // Adjust the CSS for the new design
import HighPriorityIcon from './icons_FEtask/Img - High Priority.svg';
import MediumPriorityIcon from './icons_FEtask/Img - Medium Priority.svg';
import LowPriorityIcon from './icons_FEtask/Img - Low Priority.svg';
import NoPriorityIcon from './icons_FEtask/No-priority.svg';

const CardComponent = ({ id, title, tag, priority }) => {
  // Function to render the correct icon based on priority
  const renderPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return <img src={HighPriorityIcon} alt="High Priority" />;
      case 'medium':
        return <img src={MediumPriorityIcon} alt="Medium Priority" />;
      case 'low':
        return <img src={LowPriorityIcon} alt="Low Priority" />;
      default:
        return <img src={NoPriorityIcon} alt="No Priority" />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-id">{id}</div>
        <div className="priority-icon">{renderPriorityIcon()}</div>
      </div>
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-tags">
        <div className="tag"><span>{tag}</span></div>
    </div>
    </div>
  );
};

export default CardComponent;
