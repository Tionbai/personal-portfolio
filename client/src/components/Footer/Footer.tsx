import React from 'react';
import PropTypes from 'prop-types';
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
            className="footer-link--raised"
            type="button"
            onClick={() => setContactState(true)}
          >
            CONTACT
          </button>
          <a
            className="footer-link--raised"
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/Tionbai"
          >
            GITHUB
          </a>
        </div>
        <section className="footer-end">
          <a className="footer-link" href="#header">
            BACK TO TOP
          </a>
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
