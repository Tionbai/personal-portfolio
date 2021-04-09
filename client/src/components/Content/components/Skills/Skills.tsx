import React from 'react';
import './Skills.scss';

interface Props {}

const Skills: React.FC<Props> = () => {
  const skillsList = [
    {
      name: 'Frontend',
      image: 'assets/skills/Frontend-icon.png',
      skills: ['HTML5', 'CSS3 | Sass', 'JavaScript', 'React'],
    },
    {
      name: 'Backend',
      image: 'assets/skills/Backend-icon.png',
      skills: ['Node.js', 'Express', 'Socket.io'],
    },
    {
      name: 'Database',
      image: 'assets/skills/Database-icon.png',
      skills: ['MongoDB', 'PostgreSQL'],
    },
    {
      name: 'Tools',
      image: 'assets/skills/Tools-icon.png',
      skills: ['VS Code', 'Postman', 'Adobe XD', 'Trello'],
    },
  ];

  return (
    <section className="Skills">
      <div className="skills-background" />
      <div id="skills" className="content-placeholder" />
      <h1 className="title">Skills</h1>
      <section className="skills-container">
        {skillsList.map((skill) => {
          return (
            <article className="skills-item" key={skill.name}>
              <img className="skills-item__icon" src={skill.image} alt="" />
              <h4>{skill.name.toUpperCase()}</h4>
              <ul className="skills-item__list">
                {skill.skills.map((skillElement) => {
                  return <li key={skillElement}>{skillElement}</li>;
                })}
              </ul>
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default Skills;
