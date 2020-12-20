import React, { useEffect, useState } from "react";
import axios from "../Functions/useAxios";
import FileUpload from "../Functions/fileUpload";
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
      <FileUpload />
      {error && <div>error...</div>}
      {posts.map((i) => (
        <ul>
          <li key={i._id} style={{ padding: "15px" }}>
            {i.title}
            <br />
            {i.subject}
          </li>
        </ul>
      ))}
    </main>
  );
}
