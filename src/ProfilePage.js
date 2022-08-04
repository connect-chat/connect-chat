import React, { useEffect, useState } from 'react';
import { useDataContext } from './DataProvider';
import { getZodiac } from './services/fetch-utils';
import { useLocation } from 'react-router-dom';

import './profile.css';

export default function ProfilePage() {
  const { push } = useLocation();
  const { sign } = useDataContext();
  const [horoscope, setHoroscope] = useState({});

  useEffect(() => {
    async function userDetails() {
      const horoscope = await getZodiac(sign);
      setHoroscope(horoscope);
    }
    userDetails();
  }, [sign]);

  return (
    <div className="main">
      <div className="profile-div">
        <div className="profile-greeting">
          <h2>More About your sign</h2>
          <p>Your Sign: {sign}</p>
          <p>You could be feeling: {horoscope.mood}</p>
          <p>{horoscope.description}</p>
        </div>
        <div>
          <button
            className="magic-button"
            onClick={(e) => {
              e.preventDefault();
              // this keeps us in react-router
              push('/chat');
            }}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
