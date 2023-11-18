// frontend/src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages from backend
    // You need to replace the API endpoint with your backend service URL
    fetch('http://backend-service:5000/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  const sendMessage = () => {
    // Send a new message to the backend
    fetch('http://backend-service:5000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newMessage }),
    });

    // Update the local state with the new message
    setMessages([...messages, { text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
