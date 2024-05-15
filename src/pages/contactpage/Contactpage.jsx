import React, { useState,useRef } from "react";
import LandingNavbar from "../../components/LandingNav/LandingNav";
import emailjs from '@emailjs/browser';
import "./Contactpage.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_qiwl3ls', 'template_3eygnxl', form.current, '9wNrPPUlzm4R-Mnc8')
        .then((result) => {

            console.log(result.text);
            e.target.reset();
            alert('Email Sent !')
           
        }, (error) => {
            console.log(error.text);
        });
    };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form submission logic here (e.g., validate inputs, send email)
    console.log("Form submitted:", { name, email, message });

    // Optionally, reset the form after submission
    setName("");
    setEmail("");
    setMessage("");
    setFormSubmitted(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <LandingNavbar />
      <div className="contact-page">
        <div className="container">
          <h1>Contact Us</h1>
          {formSubmitted ? (
            <p className="success-message">
              Thanks for contacting us! We'll get back to you soon.
            </p>
          ) : (
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                 
                  name='from_name' 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name='your_email'
                 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
