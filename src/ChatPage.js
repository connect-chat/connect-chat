import React, { useEffect } from 'react';
import { useState } from 'react';
import { createMessage, getMessages, client } from './services/client';
import DataProvider from './DataProvider';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [userNameInForm, setUserNameInForm] = useState('');
  const [messageInForm, setMessageInForm] = useState('');

  async function handleNameSubmit(e) {
    e.preventDefault();

    setUserName(userName);
  }

  async function load() {
    const data = await getMessages();

    setMessages(data);
  }

  useEffect(() => {
    client
      .from('chat_messages')
      .on('*', async ({ new: { from, message } }) => {
        if (from && message) {
          setMessages((previousMessages) => [...previousMessages, { from, message }]);
        }
      })
      .subscribe();
  }, []);

  async function handleSubmitMessage(e) {
    e.preventDefault();

    await createMessage(userName, messageInForm);
    setMessageInForm('');
  }

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
            <form onSubmit={handleSubmitMessage} className="message-input">
              <input value={messageInForm} onChange={(e) => setMessageInForm(e.target.value)} />
              <button>Send Message</button>
            </form>
            {messages.map((message, i) => (
              <p key={message.from + i + message.message}>
                {message.from}: {message.message}
              </p>
            ))}
          </header>
        </>
      }
    </div>
  );
}
