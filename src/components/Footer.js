import React from 'react';
import Clock from './Clock';

const Footer = () => (
  <footer>
    {/* <div><small> Star me! </small></div> */}
    <div>
      <a className = "github-button" href = "https://github.com/yanym/react-ecommerce" data-size = "large" aria-label = "Star!!!!">Star me!!!</a>
    </div>
    <div>
      <a href = "https://www.linkedin.com/in/yiming-yan-a6640111a/" rel = "noopener noreferrer" target = "_blank" title = "Linkedin Profile">Click LinkedIn: Yiming Yan</a>
    </div>
    <div>
      <Clock />
    </div>
  </footer>
);

export default Footer;