import React from 'react';
import './Skills.scss';

interface Props {}

const Skills: React.FC<Props> = () => {
  return (
    <section className="Skills">
      <div className="skills-background" />
      <div id="skills" className="content-placeholder" />
      <h1 className="title">Skills</h1>
      <section className="skills-container">
        <article className="skills-item">
          <img className="skills-item__icon" src="assets/skills/Frontend-icon.png" alt="" />
          <h4>FRONTEND</h4>
          <ul className="skills-item__list">
            <li>HTML5</li>
            <li>CSS3 | Sass</li>
            <li>JavaScript</li>
            <li>React</li>
          </ul>
        </article>
        <article className="skills-item">
          <img className="skills-item__icon" src="assets/skills/Backend-icon.png" alt="" />
          <h4>BACKEND</h4>
          <ul className="skills-item__list">
            <li>Node.js</li>
            <li>Express</li>
            <li>Socket.io</li>
          </ul>
        </article>
        <article className="skills-item">
          <img className="skills-item__icon" src="assets/skills/Database-icon.png" alt="" />
          <h4>DATABASE</h4>
          <ul className="skills-item__list">
            <li>MongoDB</li>
            <li>PostgreSQL</li>
          </ul>
        </article>
        <article className="skills-item">
          <img className="skills-item__icon" src="assets/skills/Tools-icon.png" alt="" />
          <h4>TOOLS</h4>
          <ul className="skills-item__list">
            <li>VS Code</li>
            <li>Postman</li>
            <li>Adobe XD</li>
            <li>Trello</li>
          </ul>
        </article>
      </section>
    </section>
  );
};

export default Skills;
