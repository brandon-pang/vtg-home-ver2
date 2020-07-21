import React from 'react';
import "./emailBox.scss";

const EmailBox = () => {
  return (
    <form className="email_contents_container">
      <div className="email_name_wrapper">
        <input className="email_name"></input>
      </div>
      <div className="email_address_wrapper">
        <input className="email_address"></input>
      </div>
      <div className="email_subject_wrapper">
        <input className="email_subject"></input>
      </div>
      <div className="email_message_wrapper">
        <textarea className="email_message"></textarea>
      </div>
    </form>
  )
}

export default EmailBox;