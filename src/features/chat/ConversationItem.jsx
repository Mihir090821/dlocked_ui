// components/ConversationItem.jsx
import React from 'react';

const ConversationItem = ({ conversation, isSelected, onClick }) => {
  return (
    <div 
      className={`conversation-item ${isSelected ? 'active' : ''}`}
      onClick={() => onClick(conversation.name)}
    >
      <div 
        className="avatar" 
        style={{ backgroundColor: conversation.bgColor }}
      >
        {conversation.initials}
      </div>
      <div className="conversation-content">
        <div className="conversation-header">
          <span className="conversation-name">{conversation.name}</span>
          <span className="conversation-time">{conversation.time}</span>
        </div>
        <p className="last-message">{conversation.lastMessage}</p>
      </div>
    </div>
  );
};

export default ConversationItem;
