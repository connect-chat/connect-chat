import React, { useEffect, useState } from 'react';
import { useDataContext } from './DataProvider';
import { getZodiac } from './services/fetch-utils';

export default function ProfilePage() {
  const { sign, setSign } = useDataContext();
  const [horoscope, setHoroscope] = useState({});

  useEffect(() => {
    async function userDetails() {
      const horoscope = await getZodiac();
      console.log(horoscope);
      setHoroscope(horoscope);
    }
    userDetails();
  }, []);
  return ( 
    <p>{ sign }</p>
    // sign.map((zodiac, i) => <div
    //   key={zodiac.sign + i} className='zodiac-info'>
    //   <p>{zodiac.current_date}</p>
    // </div>)
  );
}