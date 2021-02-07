import React from 'react';
import PropTypes from 'prop-types';
import { NavHashLink } from 'react-router-hash-link';
import './Footer.scss';

interface Props {
  setContactState?: any;
}

export const Footer: React.FC<Props> = ({ setContactState }) => {
  return (
    <section className="Footer">
      <div className="footer-background" />
      <section className="footer-content">
        <h1 className="title">Bye</h1>
        <p className="footer-text">
          You have reached the end!
          <br />
          <br />
          Thank you for stopping by. If you enjoy my content and want to get in touch, send me
          an email or connect with me on Github.
        </p>
        <div className="footer-links">
          <button
            className="btn--raised--bg-dark"
            type="button"
            onClick={() => setContactState(true)}
          >
            CONTACT
          </button>
          <a
            className="btn--raised--bg-dark"
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/Tionbai"
          >
            GITHUB
          </a>
        </div>
        <section className="footer-end">
          <NavHashLink
            className="btn--bg-dark"
            smooth
            to="#home"
            activeClassName="selectedLink"
          >
            BACK TO TOP
          </NavHashLink>
          <div className="footer-line" />
          <p>© 2021 Tina Bisgaard</p>
        </section>
      </section>
    </section>
  );
};

export default Footer;

Footer.propTypes = {
  setContactState: PropTypes.func.isRequired,
};
