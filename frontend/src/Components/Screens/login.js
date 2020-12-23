import React, { useState } from "react";
import { useForm } from "../Functions/useform";
import axios from "../Functions/useAxios";
import jwt from "jsonwebtoken";
export function login() {
  const [loading, setLoading] = useState(false);
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/login", values)
      .then((res) => {
        const payload = jwt.decode(res.headers.authorization);
        console.log(payload);
        localStorage.setItem("user-info", JSON.stringify(payload));
        const token = res.headers.authorization;
        localStorage.setItem("auth-token", token);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  function logout(e) {
    e.preventDefault();
    localStorage.setItem("user", "");
    localStorage.setItem("auth-token", "");
  }
  return (
    <main>
      <h2>login</h2>
      <form className="form" onSubmit={handleSubmit}>
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

        <button type="submit">Send</button>
      </form>
      <button onClick={(e) => logout(e)}>logout</button>
    </main>
  );
}
