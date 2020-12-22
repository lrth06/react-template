import { json } from "body-parser";
import React, { useEffect, useState } from "react";
import axios from "../Functions/useAxios";
export function blogPost({ match }) {
  const [loading, setLoading] = useState(false);
  const id = match.params.id;
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const getPost = async () => {
    setLoading(true);
    try {
      const post = await axios.get(`/posts/${id}`);
      if (post) {
        setData(post.data);
        setComments(post.data.comments);
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
      <div className="post-detail">
        <h1>{data.title}</h1>
        <img style={{ width: "20%" }} src={data.image} alt={data.title} />

        <span>
          <strong>{data.author}</strong>
        </span>
        <p>{data.subject}</p>
        <p>{data.content}</p>
        {comments && comments.length === 1 && (
          <span>{comments.length} Comment</span>
        )}
        {comments && comments.length > 1 && (
          <span>{comments.length} Comments</span>
        )}
        {comments.map((i) => (
          <div className="comment" key={i._id}>
            <p>{i.comment}</p>
            <span>{i.author}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
