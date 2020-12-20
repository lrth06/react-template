import React, { useState } from "react";
import { useForm } from "../Functions/useform";
import axios from "../Functions/useAxios";
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
        console.log(res.headers.get("token"));
        // const user = res.data.user;
        // localStorage.setItem("user", user);
        // const token = res.headers.token;
        // localStorage.setItem("auth-token", token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    </main>
  );
}
