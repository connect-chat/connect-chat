import React from 'react';
import './About.css';

export default function AboutPage() {
  return (
    <>
      <div className='meet-us'>
        <h1>Meet the Team!</h1>
      </div>
      <div className='container'>
        <div className='box'>
          <span></span>
          <div className='content'>
            <h3>Colter</h3>
            <p>Birthday: 5/5/93</p>
            <p>Birth Time: 8:32pm, Seattle, WA</p>
            <p>Taurus Sun, Scorpio Moon, Scorpio Rising</p>
            <a href="https://www.linkedin.com/in/colter-garrison/">LinkedIn</a>
            <a href="https://github.com/Colter-Garrison">GitHub</a>
          </div>
        </div>
        <div className='box'>
          <span></span>
          <div className='content'>
            <h3>Niki</h3>
            <p>Birthday: 6/11/02</p>
            <p>Birth Time: 9:50pm, Vancouver, WA</p>
            <p>Gemini Sun, Cancer Moon, Capricorn Rising</p>
            <a href="https://www.linkedin.com/in/nikihite/">LinkedIn</a>
            <a href="https://github.com/nikihite">GitHub</a>
          </div>
        </div>
        <div className='box'>
          <span></span>
          <div className='content'>
            <h3>Amaya</h3>
            <p>Birthday: 4/29/89</p>
            <p>Birth Time: 11:13pm, Amarillo, TX</p>
            <p>Taurus Sun, Aquarius Moon, Sagittarius Rising</p>
            <a href="https://www.linkedin.com/in/amayamaya/">LinkedIn</a>
            <a href="https://github.com/amayamaya">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
