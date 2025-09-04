import React, { useState } from 'react';
import '../../assets/css/chats.css';
import SearchBar from '../../utils/components/Commen/Search';

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState('David Brown');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Client Name',
      initials: 'CN',
      lastMessage: 'What are you going to do tonight?',
      time: '3:46 PM',
      bgColor: '#8B5CF6'
    },
    {
      id: 2,
      name: 'David Brown',
      initials: 'DB',
      lastMessage: "What's your plan for the night?",
      time: '5:30 PM',
      bgColor: '#10B981',
      active: true
    },
    {
      id: 3,
      name: 'James Wilson',
      initials: 'JW',
      lastMessage: 'Do you have any activities planned fo...',
      time: '2:00 PM',
      bgColor: '#F59E0B'
    },
    {
      id: 4,
      name: 'Emily Carter',
      initials: 'EC',
      lastMessage: 'Are you doing anything fun tonight?',
      time: '10:15 AM',
      bgColor: '#EF4444'
    },
    {
      id: 5,
      name: 'John Smith',
      initials: 'JS',
      lastMessage: 'What are you up to later?',
      time: 'Yesterday',
      bgColor: '#6366F1'
    },
    {
      id: 6,
      name: 'Michael Johnson',
      initials: 'MJ',
      lastMessage: 'Any exciting plans for this evening?',
      time: '15 Aug',
      bgColor: '#8B5CF6'
    },
    {
      id: 7,
      name: 'Sophia Johnson',
      initials: 'SJ',
      lastMessage: "What's on your mind for this evening?",
      time: '12 Aug',
      bgColor: '#EC4899'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'David Brown',
      content: "Hey Mark, are you free to catch up later? I'd love to hear about your latest project!",
      time: '11:21 AM',
      date: '12 August 2025',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      content: "Hey! I'm available later. I'd be excited to share all the details about my new app development. Let's set a time!",
      time: '11:22 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'David Brown',
      content: 'Good Evening Mark!',
      time: '6:12 PM',
      isMe: false
    },
    {
      id: 4,
      sender: 'David Brown',
      content: 'You available now?',
      time: '6:12 PM',
      isMe: false
    },
    {
      id: 5,
      sender: 'You',
      content: "Yes I'm available, Lets connect at 6:30 pm.",
      time: '6:22 PM',
      isMe: true
    },
    {
      id: 6,
      sender: 'David Brown',
      content: 'Sure 👍',
      time: '6:24 PM',
      isMe: false
    },
    {
      id: 7,
      sender: 'David Brown',
      content: "What's your plan for the night?",
      time: '5:30 PM',
      date: 'Today',
      isMe: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle message sending logic here
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Messages</h2>
          <SearchBar  placeholder="Search for new conversations"/>  
        </div>
        
        <div className="conversations-list">
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              className={`conversation-item ${conv.active ? 'active' : ''}`}
              onClick={() => setSelectedChat(conv.name)}
            >
              <div 
                className="avatar" 
                style={{ backgroundColor: conv.bgColor }}
              >
                {conv.initials}
              </div>
              <div className="conversation-content">
                <div className="conversation-header">
                  <span className="conversation-name">{conv.name}</span>
                  <span className="conversation-time">{conv.time}</span>
                </div>
                <p className="last-message">{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-user-info">
            <div className="chat-avatar">
              <img src="/api/placeholder/40/40" alt="David Brown" />
            </div>
            <span className="chat-user-name">David Brown</span>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => {
            const showDate = message.date && (index === 0 || messages[index - 1].date !== message.date);
            
            return (
              <React.Fragment key={message.id}>
                {showDate && (
                  <div className="date-divider">
                    <span>{message.date}</span>
                  </div>
                )}
                <div className={`message ${message.isMe ? 'message-sent' : 'message-received'}`}>
                  {!message.isMe && (
                    <div className="message-avatar">
                      <img src="/api/placeholder/32/32" alt={message.sender} />
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      <p>{message.content}</p>
                    </div>
                    <div className="message-info">
                      <span className="message-sender">{message.isMe ? 'You' : message.sender}</span>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          
          {/* Today divider */}
          <div className="date-divider">
            <span>Today</span>
          </div>
          <div className="message message-received">
            <div className="message-avatar">
              <img src="/api/placeholder/32/32" alt="David Brown" />
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <p>What's your plan for the night?</p>
              </div>
              <div className="message-info">
                <span className="message-sender">David Brown</span>
                <span className="message-time">5:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="message-input-container">
          <form onSubmit={handleSendMessage} className="message-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="message-input"
              />
              <button type="button" className="attachment-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 16.4a2 2 0 0 1-2.83-2.83l8.49-8.4"/>
                </svg>
              </button>
            </div>
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chats;
