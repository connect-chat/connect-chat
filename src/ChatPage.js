import React, { useEffect } from 'react';
import { useState } from 'react';
import { createMessage, getMessages, client } from './services/client';
import { useDataContext } from './DataProvider';
import { createProfile } from './services/fetch-utils';
import { getSign } from './services/fetch-utils';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const { userName, setUserName, sign, setSign } = useDataContext();
  const [userNameInForm, setUserNameInForm] = useState(userName || '');
  const [messageInForm, setMessageInForm] = useState('');
  const [signInForm, setSignInForm] = useState('');

  async function handleNameSubmit(e) {
    e.preventDefault();
    setUserName(userNameInForm);
    setSign(signInForm);
    await createProfile(userNameInForm, signInForm);
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
      {!userName && !sign ? (
        <form className="user-greeting" onSubmit={handleNameSubmit}>
          <input
            required
            placeholder="Username"
            value={userNameInForm}
            onChange={(e) => setUserNameInForm(e.target.value)}
          />
          <select required placeholder="Select Zodiac Sign">
            <option>Aries</option>
            <option>Taurus</option>
            <option>Gemini</option>
            <option>Cancer</option>
            <option>Leo</option>
            <option>Virgo</option>
            <option>Libra</option>
            <option>Scorpio</option>
            <option>Sagittarius</option>
            <option>Capricorn</option>
            <option>Aquarius</option>
            <option>Pisces</option>
          </select>
          {/* value={signInForm}
            onChange={(e) => setSignInForm(e.target.value)} */}
          <button>Submit</button>
        </form>
        
      ) : (
        <header className="header">
          <h3>Hello {userName}, everyone loves a {sign}</h3>
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
