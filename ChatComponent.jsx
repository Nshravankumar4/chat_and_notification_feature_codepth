// frontend/src/components/ChatComponent.jsx

import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const ChatComponent = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const firestore = firebase.firestore();
  const messagesRef = firestore.collection('messages');

  useEffect(() => {
    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      const updatedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, [messagesRef]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      await messagesRef.add({
        content: newMessage,
        sender: currentUser,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Add a notification to the notifications collection
      const notificationsRef = firebase.firestore().collection('notifications');
      await notificationsRef.add({
        message: `New message from ${currentUser}: ${newMessage}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
