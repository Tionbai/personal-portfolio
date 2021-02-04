import React, { useState } from 'react';
import './Project.scss';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ProjectModal from './components/ProjectModal';

interface Props {
  project: any;
}

const Project: React.FC<Props> = ({ project }) => {
  const [cardState, setCardState] = useState(false);
  const [modalState, setModalState] = useState(false);

  const flipCard = (state: boolean) => {
    const innerContainer = document.querySelector('.Project-inner__container');
    if (innerContainer) {
      innerContainer.classList.add('flip');
      innerContainer.classList.remove('flip');
      setCardState(state);
    }
  };

  const handleClickCard = (e: any) => {
    e.preventDefault();
    flipCard(!cardState);
  };

  const handleClickLink = (e: any) => {
    e.stopPropagation();
  };

  const hideModal = (e) => {
    const modalContainerEl = document.getElementById('project-modal__container');

    if (e.target === modalContainerEl) {
      setModalState(false);
    }
  };

  const handleClickDemo = (e: any) => {
    e.stopPropagation();
    setModalState(true);

    window.addEventListener('click', (e2) => hideModal(e2));

    window.removeEventListener('click', (e2) => hideModal(e2));
  };

  return (
    <>
      {modalState && (
        <ProjectModal
          project={project}
          setModalState={setModalState}
          handleClickDemo={handleClickDemo}
        />
      )}
      {!cardState ? (
        <article className="Project" role="presentation" onClick={(e) => handleClickCard(e)}>
          <div className="Project-inner__container front">
            <div className={`project-image ${project.id}`}>
              <h3 className="project-name">{project.name}</h3>
            </div>
            <ul className="project-text">
              {project.stack.map((stack) => {
                return stack.technologies.map((technology) => {
                  return <li key={uuidv4()}>{technology}</li>;
                });
              })}
            </ul>
          </div>
        </article>
      ) : (
        <article className="Project" role="presentation" onClick={(e) => handleClickCard(e)}>
          <div className="Project-inner__container back">
            <div className="project-links">
              <a
                className="project-link"
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => {
                  handleClickLink(e);
                }}
              >
                SOURCE CODE
              </a>
              <button
                className="project-link--raised"
                type="button"
                onClick={(e) => handleClickDemo(e)}
              >
                PREVIEW
              </button>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Project;

Project.propTypes = {
  project: Object(PropTypes.object).isRequired,
};
