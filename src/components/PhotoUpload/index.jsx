import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PhotoUpload({ user }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
        alert("Vui lòng chọn file!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://d5jzq4-8081.csb.app/api/photo/new", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.status === 200) {
        alert("Upload thành công!");
        if (user) {
            navigate(`/photos/${user._id}`);
        } else {
            navigate("/");
        }
      } else {
        alert("Lỗi upload!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Upload New Photo</h3>
      <form onSubmit={handleUpload} >
        <div>
            <label>Select Photo:</label>
            <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files[0])} 
            />
        </div>
        <div>
            <button type="submit" >Upload</button>
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default PhotoUpload;
