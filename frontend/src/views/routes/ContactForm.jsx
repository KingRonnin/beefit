import React, { useRef, useState } from "react";
import styles from "./contactForm.module.css";
import Header from "../component/Header";

const ContactForm = () => {
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const pricingSectionRef = useRef(null);
  const coursesSectionRef = useRef(null);
  const offersSectionRef = useRef(null);
  const sections = {
    home: homeSectionRef,
    about: aboutSectionRef,
    services: servicesSectionRef,
    courses: coursesSectionRef,
    contact: contactSectionRef,
  };


  const handleScrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage(null);

    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setResponseType("success");
        setResponseMessage("Your message was sent successfully!");
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (error) {
      setIsLoading(false);
      setResponseType("error");
      setResponseMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        handleScrollToSection={handleScrollToSection}
        sections={sections}
      />
      <h2 className={styles.title}>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {responseMessage && (
        <div
          className={`${styles.responseMessage} ${
            responseType === "success" ? styles.success : styles.error
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
