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
    <div className='username-form'>
      {
        <form>
          <input placeholder='username'/>
          <button>Submit</button>
        </form>
      }
    </div>
  );
}
