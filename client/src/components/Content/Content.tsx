import React from 'react';
import PropTypes from 'prop-types';
import About from './components/About/About';
import Header from './components/Header/Header';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './Content.scss';

interface Props {
  contactState?: any;
  setContactState?: any;
}

export const Content: React.FC<Props> = ({ contactState, setContactState }) => {
  return (
    <section className="Content">
      <Header />
      <About />
      <Skills />
      <Projects />
      {contactState && <Contact setContactState={setContactState} />}
    </section>
  );
};

export default Content;

Content.propTypes = {
  contactState: PropTypes.bool.isRequired,
  setContactState: PropTypes.func.isRequired,
};
