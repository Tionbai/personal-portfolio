import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Projects.scss';
import Project from './components/Project/Project';
import ProjectList from './Projects.json';

interface Props {}

export const Projects: React.FC<Props> = () => {
  return (
    <section className="Projects">
      <div id="projects" className="content-placeholder" />
      <h1 className="title projects-title">Projects</h1>
      <section className="projects-list">
        {ProjectList.map((project) => {
          return <Project key={uuidv4()} project={project} />;
        })}
      </section>
    </section>
  );
};

export default Projects;
