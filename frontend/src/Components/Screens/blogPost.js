import React, { useEffect, useState } from "react";
import axios from "../Functions/useAxios";
export function blogPost({ match }) {
  const [loading, setLoading] = useState(false);
  const id = match.params.id;
  const [data, setData] = useState({});

  const getPost = async () => {
    setLoading(true);
    try {
      const post = await axios.get(`/posts/${id}`);
      if (post) {
        setData(post.data);
        setLoading(false);
        console.log(post);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  if (loading)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  return (
    <main>
      <h1>{data.title}</h1>
      <img style={{ width: "20%" }} src={data.image} alt={data.title} />

      <span>
        <strong>{data.author}</strong>
      </span>
      <p>{data.subject}</p>
      <p>{data.content}</p>
    </main>
  );
}
