import React, { useEffect } from 'react';
import { useState } from 'react';
import { createMessage, getMessages, client } from './services/client';
import { useDataContext } from './DataProvider';
import { createProfile } from './services/fetch-utils';

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
          <select
            onChange={(e) => setSignInForm(e.target.value)}
            required
            value={signInForm}
            placeholder="Select Zodiac Sign"
          >
            <option value="aries">Aries</option>
            <option value="taurus">Taurus</option>
            <option value="gemini">Gemini</option>
            <option value="cancer">Cancer</option>
            <option value="leo">Leo</option>
            <option value="virgo">Virgo</option>
            <option value="libra">Libra</option>
            <option value="scorpio">Scorpio</option>
            <option value="sagittarius">Sagittarius</option>
            <option value="capricorn">Capricorn</option>
            <option value="aquarius">Aquarius</option>
            <option value="pisces">Pisces</option>
          </select>
          <button>Submit</button>
        </form>
      ) : (
        <header className="chat-div">
          {/* can the line above be a div vs header? */}
          <h3 className="user-greeting">
            Hello {userName}, everyone loves a {sign}
          </h3>
          <form onSubmit={handleSubmitMessage} className="message-input">
            <input value={messageInForm} onChange={(e) => setMessageInForm(e.target.value)} />
            <button>Send</button>
          </form>
          {messages.map((message, i) => (
            <p className="sent-messages" key={message.from + i + message.message}>
              {message.from}: {message.message}
            </p>
          ))}
        </header>
      )}
    </div>
  );
}
