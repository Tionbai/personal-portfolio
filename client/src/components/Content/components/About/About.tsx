import React from 'react';
import './About.scss';

interface Props {
  title?: string;
}

export const About: React.FC<Props> = () => {
  return (
    <section className="About">
      <div id="about" className="content-placeholder" />
      <h1 className="title about-title">Hi!</h1>
      <section className="about-info">
        <p>
          Nice to see you here.
          <br />
          <br />
          I am a frontend focused full stack JavaScript web developer.
          <br />
          <br />
          This is my personal portfolio website. Have a look around, and hook me up for a chat.
          <br />
          <br />
          Talk to you soon.
          <br />
        </p>
        <span className="about-info--right">- Tina</span>
      </section>
    </section>
  );
};

export default About;
