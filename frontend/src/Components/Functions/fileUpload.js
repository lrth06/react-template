import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "./useAxios";
function FileUpload() {
  const [image, setImage] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post("/upload", formData, config);
      if (res) {
        setUploadedImage(res.data);
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    setUploadedImage(uploadedImage);
  }, [uploadedImage]);

  return (
    <div>
      <h3>Upload File</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          placeholder="Upload an Image"
        />
        <button value="submit">Submit Image</button>
      </form>
      {loading && <div>Loading...</div>}
      {uploadedImage ? (
        <div>
          <img style={{ width: "50%" }} src={uploadedImage} alt="" />
        </div>
      ) : null}
    </div>
  );
}
export default FileUpload;
