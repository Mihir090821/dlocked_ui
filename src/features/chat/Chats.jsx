// components/Chats.jsx
import React, { useState } from 'react';
import '../../assets/css/chats.css';
import SearchBar from '../../utils/components/Commen/Search';
import ConversationItem from './ConversationItem';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

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
      bgColor: '#10B981'
    },
    // ... rest of conversations
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

  const handleSendMessage = (message) => {
    // Handle message sending logic here
    console.log('Sending message:', message);
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Messages</h2>
          <SearchBar placeholder="Search for new conversations" />
        </div>

        <div className="conversations-list">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedChat === conv.name}
              onClick={setSelectedChat}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-user-info">
            <div className="chat-avatar">
              <img src="/src/assets/images/login/user.jpg" alt="David Brown" />
            </div>
            <span className="chat-user-name">{selectedChat}</span>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => {
            const showDate = message.date && (index === 0 || messages[index - 1].date !== message.date);

            return (
              <MessageBubble
                key={message.id}
                message={message}
                showDate={showDate}
              />
            );
          })}
        </div>

        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chats;
