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
            <p>Taurus Sun, Scorpio Moon, Scorpio Rising</p>
            <a href="https://www.linkedin.com/in/colter-garrison/">LinkedIn</a>
            <a href="https://github.com/Colter-Garrison">GitHub</a>
          </div>
        </div>
        <div className='box'>
          <span></span>
          <div className='content'>
            <h3>Niki</h3>
            <p>Gemini Sun, Cancer Moon, Capricorn Rising</p>
            <a href="https://www.linkedin.com/in/nikihite/">LinkedIn</a>
            <a href="https://github.com/nikihite">GitHub</a>
          </div>
        </div>
        <div className='box'>
          <span></span>
          <div className='content'>
            <h3>Amaya</h3>
            <p>Taurus Sun, Aquarius Moon, Sagittarius Rising</p>
            <a href="https://www.linkedin.com/in/amayamaya/">LinkedIn</a>
            <a href="https://github.com/amayamaya">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
