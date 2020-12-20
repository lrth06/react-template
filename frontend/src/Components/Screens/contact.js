import React, { useState } from "react";
import axios from "../Functions/useAxios";
import "../../scss/contact.scss";
import { useForm } from "../Functions/useform";

export const Contact = () => {
  const [values, handleChange] = useForm({ email: "", name: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/contact", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <>
        <h1>Contact</h1>
        <p>
          This Form uses the useForm.js reusable hook located at
          '../Components/Functions/useForm.js
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="content"
            placeholder="Your Message Here"
            value={values.content}
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </>
    </div>
  );
};
