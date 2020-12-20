import React, { useState } from "react";
import { useForm } from "../Functions/useform";
import axios from "../Functions/useAxios";
export function register() {
  const [loading, setLoading] = useState(false);
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/register", values)
      .then((res) => {
        console.log(res.data);
        const user = res.data.user;
        localStorage.setItem("user", user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={values.password2}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
