import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-300 text-base-content">
          <div>
            <span className="footer-title"></span>
          </div> 
          <div>
            <span className="footer-title"></span>
          </div> 
          <div>
            <span className="footer-title">Social</span> 
            <div className="grid grid-flow-col gap-4">
              <a href="https://github.com/NatashaPettinger" target="_blank">Github</a>
              <a href="https://npettinger.netlify.app/" target="_blank">Website</a>
              <a href="https://www.linkedin.com/in/natasha-pettinger/" target="_blank">LinkedIn</a>
            </div>
          </div>
        </footer>
    )
}

export default Footer