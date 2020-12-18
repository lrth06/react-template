import React, { useEffect, useState } from "react";
import axios from "./useAxios";

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
    }, 750);
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {loading && <div>Loading...</div>}
      {error && <div>error...</div>}
      {posts.map((i) => (
        <ul>
          <li style={{ padding: "15px" }}>
            {i.title}
            <br />
            {i.subject}
          </li>
        </ul>
      ))}
      {/* {JSON.stringify(posts)} */}
    </div>
  );
}
