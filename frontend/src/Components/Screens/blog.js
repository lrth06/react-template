import React, { useEffect, useState } from "react";
import axios from "../Functions/useAxios";
import { Link } from "react-router-dom";
import "../../scss/blog.scss";
export function postList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function getPosts() {
    setLoading(true);
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }
  useEffect(() => {
    setTimeout(() => {
      getPosts();
      setLoading(false);
    }, 1500);
  }, []);

  if (loading)
    return (
      <main>
        <h1>Posts</h1>
        <h3>Loading...</h3>
      </main>
    );
  return (
    <main>
      <h1>Posts</h1>
      {error && <div>error...</div>}
      {posts.map((i) => (
        <ul className="posts">
          <li key={i._id}>
            <div className="post">
              <img src={i.image} alt="" />

              <div className="post-text">
                <Link style={{ color: "currentColor" }} to={`/blog/${i._id}`}>
                  <h2>{i.title}</h2>
                </Link>

                <p>{i.subject}</p>
                <p>{i.author}</p>
                <p>{i.comments.length} Comments</p>
                <Link style={{ color: "currentColor" }} to={`/blog/${i._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </main>
  );
}
