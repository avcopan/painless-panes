import React, { useState } from "react";
import axios from "axios";
import FormPageHeader from "../components/FormPageHeader";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    try {
      const payload = {
        email,
        message,
      };
      const response = await axios.post("/api/email/contact", payload);

      if (response.status === 200) {
        console.log("Email sent successfully");
      }
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  return (
    <>
      <FormPageHeader text="We look forward to hearing about you, especially complaints, suggestions, and questionable jokes." />
      <div className="form-group">
        <textarea
          className="textarea"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="join">
        <input
          type="email"
          className="input input-bordered join-item"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button onClick={sendEmail} className="btn btn-primary">
        Send
      </button>
    </>
  );
}
