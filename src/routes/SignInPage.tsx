import React from 'react'
import './SignInPage.css';

export default function SignInPage() {
    return (
      <>
        <div className="left-section" />
        <div className="right-section">
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>
          <div className="input-group">

            <div className="input">
              <input type="text" />
            </div>

            <div className="input">
              <input type="email" />
            </div>

            <div className="input">
              <input type="password" />
            </div>
          </div>
          <div className="forgot-password">Lost Password? <span>Click here</span></div>
          <div className="submit-container">
            <div className="submit"> Sign Up </div>
            <div className="submit">Login</div>
          </div>
        </div>
      </>
    )
}