import React, { useState } from 'react';
import { useDataContext } from './DataProvider';
import { signInUser, signupUser } from './services/fetch-utils';

export default function AuthPage() {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');  
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');  
  const { setUser } = useDataContext();

  function clearForms() {
    setSignInEmail('');
    setSignInPassword('');
    setSignUpEmail('');
    setSignUpPassword('');
  }

  async function handleSignUp(e) {
    e.preventDefault();

    const user = await signupUser(signUpEmail, signUpPassword);
    setUser(user);
    clearForms();
  }

  async function handleSignIn(e) {
    e.preventDefault();

    const user = await signInUser(signInEmail, signInPassword);
    setUser(user);
    clearForms();
  }

  return (
    <div className="home-page">
      Sign Up
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input value={signUpPassword} type='password' onChange={e => setSignUpPassword(e.target.value)} />
        </label>
        <button>Sign Up</button>
      </form>
      Sign In
      <form onSubmit={handleSignIn}>
        <label>
          Email
          <input value={signInEmail} onChange={e => setSignInEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input value={signInPassword} type='password' onChange={e => setSignInPassword(e.target.value)} />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}