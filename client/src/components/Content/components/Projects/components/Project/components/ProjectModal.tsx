import React from 'react';
import PropTypes from 'prop-types';
import './ProjectModal.scss';

interface Props {
  project: any;
  setModalState: any;
  handleClickDemo: any;
}

const ProjectModal: React.FC<Props> = ({ project, setModalState, handleClickDemo }) => {
  return (
    <div id="project-modal__container" className="project-modal__container">
      <section className="ProjectModal">
        <video className="project-video" src={project.video} muted loop autoPlay />
        <div className="project-modal__links">
          <button
            className="btn--raised--bg-light"
            type="button"
            onClick={(e) => handleClickDemo(e)}
          >
            SOURCE CODE
          </button>
          <button className="btn--bg-light" type="button" onClick={() => setModalState(false)}>
            CLOSE
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectModal;

ProjectModal.propTypes = {
  project: Object(PropTypes.object).isRequired,
  setModalState: PropTypes.func.isRequired,
  handleClickDemo: PropTypes.func.isRequired,
};
