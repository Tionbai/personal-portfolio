import React, { useState } from 'react';
import './Contact.scss';
import PropTypes from 'prop-types';

interface Props {
  setContactState?: any;
}

const Contact: React.FC<Props> = ({ setContactState }) => {
  const [formNameValue, setFormNameValue] = useState('');
  const [formEmailValue, setFormEmailValue] = useState('');
  const [formMessageValue, setFormMessageValue] = useState('');

  // Submit validation message based on success or error submission
  const formValidationMessage = (validation) => {
    const formButtons = document.getElementById('contact-form__buttons');
    const validatorEl = document.createElement('DIV');

    /* eslint-disable-next-line */
    const validatorElText =
      validation === 'error'
        ? 'Fields with * are required.'
        : 'Your message has been successfully sent!';

    validatorEl.classList.add('contact-form-validator');
    validatorEl.classList.add(validation);
    validatorEl.innerHTML = validatorElText;

    formButtons?.append(validatorEl);
    setTimeout(() => {
      validatorEl.style.opacity = '0';
    }, 10000);
  };

  // Validate form inputs with regex patterns
  const formValidation = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const messageRegex = /^(?!\s*$).+/;

    const validName = formNameValue.match(nameRegex);
    const validEmail = formEmailValue.match(emailRegex);
    const validMessage = formMessageValue.match(messageRegex);

    if (validName && validEmail && validMessage) {
      return true;
    }
    return false;
  };

  // Empty inputs after successful submission
  const emptyInputs = () => {
    setFormNameValue('');
    setFormEmailValue('');
    setFormMessageValue('');
  };

  const sendEmail = async (email: any) => {
    fetch('/api/send/email', {
      method: 'POST',
      body: email,
    })
      .then(() => formValidationMessage('success'))
      .catch((err) => console.error(`There was an error: ${err}`));
  };

  // Handle form submission. Run validation, and send email and empty inputs if valid.
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formValidation()) {
      formValidationMessage('error');
      return;
    }

    const form = document.getElementById('contact-form');
    if (form instanceof HTMLFormElement) {
      const email = new FormData(form);
      sendEmail(email);
      emptyInputs();
    }
  };

  // Close contact modal on outside click or CANCEL button click
  const handleCloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const contactContainerEl = document.getElementById('contact__container');
    const contactEl = document.getElementById('contact');
    const contactFormEl = document.getElementById('contact-form');
    const contactFormButtons = document.getElementById('contact-form__buttons');

    if (
      /* prettier-ignore */
      e.target === contactEl
      || e.target === contactFormEl
      || e.target === contactFormButtons
    ) {
      return;
    }
    if (e.target === contactContainerEl || e.target.innerHTML.includes('CANCEL')) {
      setContactState(false);
    }
  };

  return (
    <div
      role="presentation"
      onClick={(e) => handleCloseModal(e)}
      id="contact__container"
      className="contact__container"
    >
      <section id="contact" className="Contact">
        <h1 className="title contact-title">Contact</h1>
        <form
          id="contact-form"
          className="contact-form"
          method="POST"
          action="send"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label
            htmlFor="formName"
            id="formNameLabel"
            className="contact-form__input-container"
          >
            <input
              name="name"
              id="formName"
              type="text"
              required
              pattern="^[a-zA-Z\s]*$"
              placeholder=" "
              value={formNameValue}
              className="contact-form__input"
              onChange={(e) => setFormNameValue(e.target.value)}
            />
            <span className="contact-form__placeholder">Name*</span>
            <span className="contact-form__error">* Fill out a valid name (A-Z).</span>
          </label>
          <label
            htmlFor="formEmail"
            id="formEmailLabel"
            className="contact-form__input-container"
          >
            <input
              name="email"
              id="formEmail"
              type="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder=" "
              className="contact-form__input"
              value={formEmailValue}
              onChange={(e) => setFormEmailValue(e.target.value)}
            />
            <span className="contact-form__placeholder">Email*</span>
            <span className="contact-form__error">* Fill out a valid email (X@Y.Z).</span>
          </label>
          <label
            htmlFor="formMessage"
            id="formMessageLabel"
            className="contact-form__textarea-container"
          >
            <textarea
              name="message"
              id="formMessage"
              required
              className="contact-form__textarea"
              placeholder=" "
              maxLength={1000}
              value={formMessageValue}
              onChange={(e) => setFormMessageValue(e.target.value)}
            />
            <span className="contact-form__placeholder">Message*</span>
            <span className="contact-form__error">* Max. 1000 characters allowed.</span>
          </label>
          <div id="contact-form__buttons" className="contact-form__buttons">
            <button
              className="btn--raised--bg-light"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              SUBMIT
            </button>
            <button
              className="btn--bg-light"
              type="button"
              onClick={(e) => handleCloseModal(e)}
            >
              CANCEL
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;

Contact.propTypes = {
  setContactState: PropTypes.func.isRequired,
};
