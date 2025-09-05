// Updated MessageBubble.jsx - Alternative structure
import React from 'react';

const MessageBubble = ({ message, showDate }) => {
  return (
    <React.Fragment>
      {showDate && (
        <div className="date-divider">
          <div className="date-line"></div>
          <span className="date-text">{message.date}</span>
          <div className="date-line"></div>
        </div>
      )}
      <div className={`message ${message.isMe ? 'message-sent' : 'message-received'}`}>
        {!message.isMe && (
          <div className="message-avatar">
            <img src="/src/assets/images/login/user.jpg" alt={message.sender} />
          </div>
        )}
        <div className="message-content">
          <div className="message-bubble">
            <p>{message.content}</p>
          </div>
          <div className="message-info">
            <span className="message-sender">
              {message.isMe ? 'You' : message.sender}
            </span>
            <span className="message-time">{message.time}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessageBubble;
