import React from "react";
import "../scss/about.scss";
import Code from "./code";
export function About() {
  return (
    <main>
      <div>About</div>
      <div>
        <p>This app runs on the following technologies:</p>
        <Code />
      </div>
    </main>
  );
}
