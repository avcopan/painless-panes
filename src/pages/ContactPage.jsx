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
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  return (
    <>
      <div className="pl-8 pr-8">
        <FormPageHeader text="We want to hear from you!" />
        <p>
          Reach out to us below, or email us directly at
          painlesspanesdev@gmail.com.
        </p>
      </div>
      <textarea
        className="textarea textarea-bordered textarea-info "
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="email"
        className="input input-bordered input-info"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail} className="btn btn-primary">
        Send
      </button>
    </>
  );
}
