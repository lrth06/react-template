import React from "react";
import { Layout } from "./Components/Constants/layout";
import { Home } from "./Components/Screens/home";
import { About } from "./Components/Screens/about";
import { Contact } from "./Components/Screens/contact";
import { postList } from "./Components/Screens/blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Switch>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/blog" exact component={postList} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}
