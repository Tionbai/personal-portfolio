import React from 'react';
import './Header.scss';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <section className="Header" id="home">
      <video className="Header-video" src="/assets/Pexels-video.mp4" muted loop autoPlay />
      <div className="Header-text">
        <h1 className="header-text__title">TINA BISGAARD</h1>
        <h2 className="header-text__subtitle">FULL STACK WEB DEVELOPER</h2>
        <a className="btn--raised--bg-dark" href="#projects">
          SEE PROJECTS
        </a>
      </div>
    </section>
  );
};

export default Header;
