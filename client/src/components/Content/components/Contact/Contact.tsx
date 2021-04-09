import React, { useState } from 'react';
import './Contact.scss';
import PropTypes from 'prop-types';

interface Props {
  setContactState?: any;
}

const initialValues = {
  name: '',
  email: '',
  message: '',
};

const Contact: React.FC<Props> = ({ setContactState }) => {
  const [values, setValues] = useState(initialValues);

  // Submit validation message based on success or error submission
  const formValidationMessage = async (validation) => {
    const formButtons = document.getElementById('contact-form__buttons');
    const validatorEl = document.createElement('DIV');
    validatorEl.classList.add('contact-form-validator');

    switch (validation) {
      case 'success':
        validatorEl.classList.add('success');
        validatorEl.innerHTML = 'Your message has been successfully sent!';
        break;
      case 'error-400':
        validatorEl.classList.add('error');
        validatorEl.innerHTML = 'Fields with * are required.';
        break;
      case 'error-500':
        validatorEl.classList.add('error');
        validatorEl.innerHTML = 'Sorry, something wrong happened!';
        break;
      default:
        break;
    }

    formButtons?.append(validatorEl);
    setTimeout(() => {
      validatorEl.style.opacity = '0';
    }, 10000);
  };

  // Validate form inputs with regex patterns
  const formValidation = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const messageRegex = /^(?!\s*$).+/;

    const validName = values.name.match(nameRegex);
    const validEmail = values.email.match(emailRegex);
    const validMessage = values.message.match(messageRegex);

    if (validName && validEmail && validMessage) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission. Run validation, and send email and empty inputs if valid.
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formValidation()) {
      formValidationMessage('error-400');
      return;
    }

    const res = await fetch('/api/send/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.status === 200) {
      formValidationMessage('success');
      setValues(initialValues);
    } else {
      formValidationMessage('error-500');
    }
  };

  // Close contact modal on outside click or CANCEL button click
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      onClick={handleCloseModal}
      id="contact__container"
      className="contact__container"
    >
      <section id="contact" className="Contact">
        <h1 className="title contact-title">Contact</h1>
        <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
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
              value={values.name}
              className="contact-form__input"
              onChange={handleChange}
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
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
              placeholder=" "
              className="contact-form__input"
              value={values.email}
              onChange={handleChange}
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
              value={values.message}
              onChange={handleChange}
            />
            <span className="contact-form__placeholder">Message*</span>
            <span className="contact-form__error">* Max. 1000 characters allowed.</span>
          </label>
          <div id="contact-form__buttons" className="contact-form__buttons">
            <button className="btn--raised--bg-light" type="submit" onClick={handleSubmit}>
              SUBMIT
            </button>
            <button className="btn--bg-light" type="button" onClick={handleCloseModal}>
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
