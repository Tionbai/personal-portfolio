import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Sidebar.scss';

interface Props {
  title?: string;
  setContactState?: any;
  sidebarState?: any;
  setSidebarState?: any;
}

const Sidebar: React.FC<Props> = ({ setContactState, setSidebarState }) => {
  const sidebarLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const handleSidebarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.innerHTML.includes('Contact')) {
      setContactState(true);
    } else {
      setContactState(false);
    }
    setSidebarState(false);
  };

  return (
    <div id="sidebar__container" role="presentation" className="sidebar__container">
      <ul id="sidebar" className="sidebar">
        <svg
          className="sidebar-menu"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 0 24 24"
          width="36"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="rgb(92, 79, 150)"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
        {sidebarLinks.map((sidebarLink) => {
          return (
            <NavHashLink
              key={uuidv4()}
              className="sidebar-item"
              smooth
              to={`#${sidebarLink.toLowerCase()}`}
              activeClassName="selectedLink"
              onClick={(e) => handleSidebarClick(e)}
            >
              <svg
                className="sidebar-item__arrow"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="rgb(92, 79, 150)"
                  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                />
              </svg>
              <button
                type="button"
                onClick={(e) => handleSidebarClick(e)}
                className="sidebar-item__text"
              >
                {sidebarLink}
              </button>
            </NavHashLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  setContactState: PropTypes.func.isRequired,
  setSidebarState: PropTypes.func.isRequired,
};
