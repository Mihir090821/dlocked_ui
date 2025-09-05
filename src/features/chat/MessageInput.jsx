// components/MessageInput.jsx
import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, onSendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <div className="input-actions">
            <button type="button" className="attachment-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button type="button" className="emoji-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 9 1.5 1.5L9 12" />
                <path d="m15 9-1.5 1.5L15 12" />
                <path d="M8 15s1.5 2 4 2 4-2 4-2" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
          />
          <button type="submit" className="send-button">
          Send
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default MessageInput;
