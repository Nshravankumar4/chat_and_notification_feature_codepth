// frontend/src/App.js

import React from 'react';
import firebase from './firebase/firebase';
import ChatComponent from './components/ChatComponent';
import Notifications from './components/Notifications';

const App = () => {
  const currentUser = 'User123'; // Replace with actual user authentication logic

  return (
    <div>
      <h1>Real-Time Chat App</h1>
      <ChatComponent currentUser={currentUser} />
      <Notifications />
    </div>
  );
};

export default App;
