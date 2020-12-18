import React, { useEffect } from "react";
import { ReactComponent as JWT } from "./Icons/jwt.svg";
import { ReactComponent as MongoDB } from "./Icons/mongodb.svg";
import { ReactComponent as ExpressJS } from "./Icons/express.svg";
import { ReactComponent as NodeJS } from "./Icons/node-js.svg";
import { ReactComponent as Sass } from "./Icons/node-sass.svg";
import { ReactComponent as ReactJS } from "./Icons/react.svg";
import { ReactComponent as AWS } from "./Icons/AWS.svg";
import "../scss/code.scss";
export default function Code() {
  return (
    <div>
      <MongoDB className="icon" />
      <ExpressJS className="icon" />
      <ReactJS id="react" className="icon" />
      <NodeJS className="icon" />
      <Sass className="icon" />
      <AWS className="icon" />
      <JWT className="icon" />
    </div>
  );
}
