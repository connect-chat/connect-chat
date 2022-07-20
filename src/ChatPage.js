import React, { useEffect } from 'react';
import { useState } from 'react';
import { createMessage, getMessages, client } from './services/client';
import { useDataContext } from './DataProvider';
import { createProfile } from './services/fetch-utils';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const { userName, setUserName, birthday, setBirthday } = useDataContext();
  const [userNameInForm, setUserNameInForm] = useState(userName || '');
  const [messageInForm, setMessageInForm] = useState('');
  const [birthdayInForm, setBirthdayInForm] = useState('');

  async function handleNameSubmit(e) {
    e.preventDefault();
    setUserName(userNameInForm);
    setBirthday(birthdayInForm);
    await createProfile(userNameInForm, birthdayInForm);
    load();
  }

  async function load() {
    const data = await getMessages();

    setMessages(data);
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line

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
    load();
  }

  return (
    <div className="chat">
      {!userName && !birthday ? (
        <form className="user-greeting" onSubmit={handleNameSubmit}>
          <input
            required
            placeholder="Username"
            value={userNameInForm}
            onChange={(e) => setUserNameInForm(e.target.value)}
          />
          <input
            required
            type="date"
            placeholder="Birthday"
            value={birthdayInForm}
            onChange={(e) => setBirthdayInForm(e.target.value)}
          />
          <button>Submit</button>
        </form>
        
      ) : (
        <header className="header">
          <h3>Hello {userName}, Your Birthday is {birthday}</h3>
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
      )}
    </div>
  );
}
