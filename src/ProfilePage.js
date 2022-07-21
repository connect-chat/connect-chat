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
    <div>
      <p>Your Sign: { sign }</p>
      <p>Todays Date: { horoscope.current_date }</p>
      <p>Horoscope Compatibility: { horoscope.compatibility }</p>
      <p>Todays Lucky Number: { horoscope.lucky_number }</p>
      <p>Todays Lucky Time: { horoscope.lucky_time }</p>
      <p>Color: { horoscope.color }</p>
      <p>{ sign }s are born { horoscope.date_range }</p>
      <p>You could be feeling: { horoscope.mood }</p>
      <p>{ horoscope.description }</p>
    </div>
  );
}