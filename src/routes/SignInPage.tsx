import React, { useState } from 'react'
import './SignInPage.css';

export default function SignInPage() {

  const [action,setAction] = useState("Sign Up");

    return (
      <>
        <div className="left-section" />
        <div className="right-section">
          <div className="header">
            <div className="text">[action]</div>
            <div className="underline"></div>
          </div>
          <div className="input-group">
            {action==="Login"?<div></div>:
            <div className="input">
              <input type="text" placeholder='Name' />
            </div>}

            <div className="input">
              <input type="email" placeholder='Email' />
            </div>

            <div className="input">
              <input type="password" placeholder='Password' />
            </div>
          </div>
          {action==="Sign Up"?<div></div>:
          <div className="forgot-password">Lost Password? <span>Click here</span></div>}
          <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
          </div>
        </div>
      </>
    )
}