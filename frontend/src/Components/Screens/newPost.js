import React, { useEffect, useState } from "react";
import axios from "../Functions/useAxios";
import { useForm } from "../Functions/useform";
import "../../scss/blog.scss";
export function newPost() {
  const [image, setImage] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleChangeImage = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];

    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("image", image);
      function endpoint() {
        if (process.env.REACT_APP_NODE_ENV !== "production") {
          return "/upload/local";
        } else {
          return "/upload";
        }
      }
      const res = await axios.post(`${endpoint()}`, formData, config);
      if (res) {
        setUploadedImage(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (e) => {
    const values = {
      title: title,
      subject: subject,
      content: content,
      image: uploadedImage,
    };
    e.preventDefault();
    try {
      const post = await axios.post("/posts", values);
      if (post) {
        alert("Success!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>New Post</h1>
      {uploadedImage && <img style={{ width: "25%" }} src={uploadedImage} />}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleChangeImage}
          placeholder="Upload an Image"
        />
        <p htmlFor="file">{uploadedImage}</p>
        <input
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="subject"
          placeholder="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          type="text"
          name="content"
          placeholder="Post Content Here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
