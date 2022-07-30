import React from 'react';
import './About.css';

export default function AboutPage() {
  return (
    <>
      <div className="meet-us">
        <h1>Meet the Team!</h1>
      </div>
      <div className="container">
        <div className="box">
          <span></span>
          {/* might have been nice to store these repeated points an array of data somewhere { name: 'Colter', sun: 'Taurus',  linkedin: '...', etc}, so you could map over an array and reduce code duplication */}
          <div className="content">
            <h3>Colter</h3>
            <p>
              Taurus Sun,
              <br />
              Scorpio Moon,
              <br />
              Scorpio Rising
            </p>
            <a href="https://www.linkedin.com/in/colter-garrison/">LinkedIn</a>
            <a href="https://github.com/Colter-Garrison">GitHub</a>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content">
            <h3>Niki</h3>
            <p>
              Gemini Sun, <br />
              Cancer Moon, <br />
              Capricorn Rising
            </p>
            <a href="https://www.linkedin.com/in/nikihite/">LinkedIn</a>
            <a href="https://github.com/nikihite">GitHub</a>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content">
            <h3>Amaya</h3>
            <p>
              Taurus Sun, <br />
              Aquarius Moon, <br />
              Sagittarius Rising
            </p>
            <a href="https://www.linkedin.com/in/amayamaya/">LinkedIn</a>
            <a href="https://github.com/amayamaya">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
