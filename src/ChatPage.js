import React from 'react';
import { useState } from 'react';
import { createMessage, getMessages, client } from './services/client';
import DataProvider from './DataProvider';

export default function ChatPage() {
  const [messages, setMessages] = useState();
  const [userName, setUserName] = useState('');
  const [userNameInForm, setUserNameInForm] = useState('');
  const [messageInForm, setMessageInForm] = useState('');

  return (
    <div className="chat">
      {
        <>
          <form className="user-greeting">
            <input placeholder="username" onChange={(e) => setUserName(e.target.value)} />
            <button>Submit</button>
          </form>
          <header className="header">
            <h3>Hello {userName}</h3>
            <form className="message-input">
              <input />
              <button>Send Message</button>
            </form>
          </header>
        </>
      }
    </div>
  );
}
