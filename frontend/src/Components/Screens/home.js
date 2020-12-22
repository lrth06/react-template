import React from "react";
import "../../scss/home.scss";

export function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>Thank you for using my Template, be sure to Star it on Github!</p>
      <a
        href="https://github.com/lrth06/react-template"
        style={{ color: "black" }}
      >
        GitHub Repository: https://github.com/lrth06/react-template
      </a>
      {JSON.stringify(process.env)}{" "}
    </main>
  );
}
