import React, { useEffect } from 'react';
import { useState } from 'react';
import { createMessage, getMessages, client } from './services/client';
import { useDataContext } from './DataProvider';
import { createProfile } from './services/fetch-utils';
import './Chat.css';

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

    setMessages(data.reverse());
  }

  useEffect(() => {
    load();
  }, [handleSubmitMessage]); // eslint-disable-line

  useEffect(() => {
    client
      .from('chat_messages')
      .on('*', async ({ new: { from, message } }) => {
        if (from && message) {
          setMessages((previousMessages) => [...previousMessages]);
        }
      })
      .subscribe();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleSubmitMessage(e) {
    e.preventDefault();

    await createMessage(userName, messageInForm);
    setMessageInForm('');
    load();
  }
  // console.log(sign);
  return (
    <div className="user-input">
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
          <button className='user-button'>Submit</button>
        </form>
      ) : (
        <>
          <div className='user-greeting'>
            <h3 className='greeting'>
            Hello @{userName}, everyone loves a {sign}
            </h3>
          </div>
          <header className="chat-div">
            {/* can the line above be a div vs header? */}
            {messages.map((message, i) => (
              <p className="sent-messages" key={message.from + i + message.message}>
                {message.from}: {message.message}
              </p>
            ))}
          </header>
          <form onSubmit={handleSubmitMessage} className="message-input">
            <input className="message-input" value={messageInForm} onChange={(e) => setMessageInForm(e.target.value)} />
            <button>Send</button>
          </form>
        </>
      )}
    </div>
  );
}
