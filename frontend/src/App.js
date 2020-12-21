import React from "react";
import { Layout } from "./Components/Constants/layout";
import { Home } from "./Components/Screens/home";
import { About } from "./Components/Screens/about";
import { Contact } from "./Components/Screens/contact";
import { postList } from "./Components/Screens/blog";
import { newPost } from "./Components/Screens/newPost";
import { blogPost } from "./Components/Screens/blogPost";
import { register } from "./Components/Screens/register";
import { login } from "./Components/Screens/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Analytics id="G-YYR1ZYZH8G" debug>
          <Switch>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={register} />
              <Route path="/login" exact component={login} />
              <Route path="/about" exact component={About} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/blog" exact component={postList} />
              <Route path="/blog/:id" exact component={blogPost} />
              <Route path="/blog/add" exact component={newPost} />
            </div>
          </Switch>
        </Analytics>
      </Router>
    </div>
  );
}
