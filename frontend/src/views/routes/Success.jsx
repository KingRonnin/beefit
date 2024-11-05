import React from 'react';
import styles from './Success.module.css';
import { useNavigate } from 'react-router-dom';

const Success = () => {

    const navigate = useNavigate()

  return (
<div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.checkmarkContainer}>
          <div className={styles.circle}>
            <svg className={styles.checkmark} viewBox="0 0 52 52">
              <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
              <path className={styles.checkmarkCheck} fill="none" d="M14 27l7 7 16-16"/>
            </svg>
          </div>
        </div>
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.message}>Thank you for your purchase. Your transaction was completed successfully.</p>
        <button onClick={()=>navigate("/")} className={styles.button}>Back to Home</button>
      </div>
    </div>
  );
};

export default Success;
