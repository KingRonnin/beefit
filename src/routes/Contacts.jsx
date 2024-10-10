import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contacts.css'; 

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We're here to help! If you have any questions, feedback, or inquiries, please feel free to reach out to us using the form below or through our contact details.
      </p>

      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required placeholder="Your Name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="Your Email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required placeholder="Your Message" rows="5"></textarea>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      <h2>Contact Details</h2>
      <ul className="contact-details">
        <li>Email: support@beefit.com</li>
        <li>Phone: (123) 456-7890</li>
      </ul>

      <Link to="/PlanFrontPage">
        <button className="back-button">Back </button>
      </Link>
    </div>
  );
}
