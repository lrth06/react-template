import React, { useEffect, useState } from "react";
import axios from "../Functions/useAxios";
import FileUpload from "../Functions/fileUpload";
import { useForm } from "../Functions/useform";
import "../../scss/blog.scss";
export function newPost() {
  const [values, handleChange] = useForm({
    title: "",
    subject: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/posts", values)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(e);
      });
  };
  useEffect(() => {}, []);

  return (
    <main>
      <h1>New Post</h1>
      <form className="form" onSubmit={handleSubmit}>
        <FileUpload />
        <input
          name="title"
          placeholder="Title"
          value={values.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={values.subject}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="content"
          placeholder="Post Body"
          value={values.content}
          onChange={handleChange}
        />
        <input type="hidden" value={values.image} />
        <button type="submit">Send</button>
      </form>
      <FileUpload />
    </main>
  );
}
