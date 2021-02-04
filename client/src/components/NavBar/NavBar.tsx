import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './NavBar.scss';
import Sidebar from './components/Sidebar';

interface Props {
  contactState?: any;
  setContactState?: any;
}

export const NavBar: React.FC<Props> = ({ contactState, setContactState }) => {
  const [sidebarState, setSidebarState] = useState(false);
  const history = useHistory();

  // Get document coordinates of top of element
  const getTopCoords = (elem) => {
    const box = elem.getBoundingClientRect();
    return box.top + window.pageYOffset;
  };

  // Fix navbar to top of window on downward scroll
  const fixNavOnScroll = () => {
    const aboutEl = document.getElementById('about');
    const navbar = document.querySelector('.navbar--wide-screen');
    const navbarSmall = document.querySelector('.navbar--small-screen');
    if (navbar && navbarSmall) {
      if (window.scrollY > getTopCoords(aboutEl) / 3) {
        navbar.classList.add('navbar-fixed');
        navbarSmall.classList.add('navbar-fixed--small');
      } else {
        navbar.classList.remove('navbar-fixed');
        navbarSmall.classList.remove('navbar-fixed--small');
      }
    }
    return navbar;
  };

  // Fix navbar to top of window on downward scroll
  useEffect(() => {
    window.onscroll = () => {
      fixNavOnScroll();
    };
  }, []);

  // Push history state if element is not locatio hash (prevent redundant push)
  const pushHistoryState = (hash) => {
    if (history.location.hash !== `${hash}`) {
      return history.push(`${hash}`);
    }
    return hash;
  };

  const switchRouteElCoordsAndPushHistoryState = () => {
    const aboutEl = document.getElementById('about');
    const skillsEl = document.getElementById('skills');
    const projectsEl = document.getElementById('projects');

    /* Switch scroll Y offset in relation to top of element.
    Then push history state according to coords. */
    switch (true) {
      case window.scrollY > getTopCoords(projectsEl) - 1:
        pushHistoryState('#projects');
        break;
      case window.scrollY > getTopCoords(skillsEl) - 1:
        pushHistoryState('#skills');
        break;
      case window.scrollY > getTopCoords(aboutEl) - 1:
        pushHistoryState('#about');
        break;
      case contactState === true:
        pushHistoryState('#contact');
        break;
      default:
        if (history.location.hash !== '#home') {
          history.push('#home');
        }
        break;
    }
  };

  // Prevent scroll on body when contact modal is open
  useEffect(() => {
    const contactEl = document.getElementById('contact-form');

    if (contactState) disableBodyScroll(contactEl);
    if (!contactState) clearAllBodyScrollLocks();
  }, [contactState]);

  // Listen for window scroll to push state. Then cleanup listener.
  useEffect(() => {
    window.addEventListener('scroll', () => switchRouteElCoordsAndPushHistoryState());
    window.removeEventListener('scroll', () => switchRouteElCoordsAndPushHistoryState());
  }, [contactState]);

  /* Handle navbar item click respective to contactState.
    If contactState is true, navbar item clicks should close contact modal,
    except if click is on 'Contact' link. */
  const handleNavbarItemClick = (e) => {
    if (!contactState) {
      if (e.target.innerHTML.includes('Contact')) {
        setContactState(true);
      }
    }
    if (contactState) {
      if (!e.target.innerHTML.includes('Contact')) {
        setContactState(false);
      }
    }
  };

  const handleOpenSidebarClick = (e) => {
    e.stopPropagation();
    setSidebarState(true);
  };

  // Close sidebar on outside click if sidebar is active
  const closeSidebarOnOutsideClick = (e) => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (e.target !== sidebar) {
        setSidebarState(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('click', (e) => closeSidebarOnOutsideClick(e));
    window.removeEventListener('click', (e) => closeSidebarOnOutsideClick(e));
  }, [sidebarState]);

  const routes = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <>
      <nav className="navbar--wide-screen">
        {/* Return NavHashLink for each route. If 'Contact' route, add onClick handler */}
        {routes.map((route) => {
          return (
            <NavHashLink
              key={uuidv4()}
              className="navbar-item"
              smooth
              to={`#${route.toLowerCase()}`}
              activeClassName="selectedLink"
              onClick={(e) => handleNavbarItemClick(e)}
            >
              {`${route}`}
            </NavHashLink>
          );
        })}
      </nav>
      {/* Small nav on mobile view */}
      <nav className="navbar--small-screen">
        <button
          className="navbar-menu"
          type="button"
          onClick={(e) => handleOpenSidebarClick(e)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 0 24 24" width="36">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        {sidebarState && (
          <Sidebar
            sidebarState={sidebarState}
            setSidebarState={setSidebarState}
            setContactState={setContactState}
          />
        )}
      </nav>
    </>
  );
};

export default NavBar;

NavBar.propTypes = {
  contactState: PropTypes.bool.isRequired,
  setContactState: PropTypes.func.isRequired,
};
