import React, { useEffect, useState } from 'react';
import { useDataContext } from './DataProvider';
import { getZodiac } from './services/fetch-utils';

import './profile.css';

export default function ProfilePage() {
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
          {/* <p>Horoscope Compatibility: {horoscope.compatibility}</p>
          <p>Todays Lucky Number: {horoscope.lucky_number}</p>
          <p>Todays Lucky Time: {horoscope.lucky_time}</p>
          <p>Color: {horoscope.color}</p>
          <p>
            {sign}&#39;s are born {horoscope.date_range}
          </p> */}
          <p>You could be feeling: {horoscope.mood}</p>
          <p>{horoscope.description}</p>
        </div>
        <div>
          <button
            className="magic-button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/chat';
            }}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
