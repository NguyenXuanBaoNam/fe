import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [commentInput, setCommentInput] = useState({});

  async function getPhotos() {
    const data = await fetchModel(`/api/photo/photosOfUser/${userId}`);
    setPhotos(data);
  }

  useEffect(() => {
    getPhotos();
  }, [userId]);

  const handleSubmit = async (photoId) => {
    const text = commentInput[photoId];
    if (!text) return;

    try {
      await fetch(
        `https://d5jzq4-8081.csb.app/api/photo/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ comment: text }),
        }
      );
      setCommentInput({ ...commentInput, [photoId]: "" });
      getPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Typography variant="body1"></Typography>
      {photos.length === 0 && <p>No photos available for this user.</p>}
      {photos.map((photo) => (
        <div key={photo._id}>
          <img
            src={`https://d5jzq4-8081.csb.app/images/${photo.file_name}`}
            alt={photo.file_name}
            style={{ maxWidth: "100%" }}
          />
          <p>Date: {new Date(photo.date_time).toLocaleString()}</p>
          {photo.comments?.map((comment) => (
            <p key={comment._id}>
              <Link to={`/users/${comment.user._id}`}>
                {comment.user.first_name} {comment.user.last_name}
              </Link>
              ({new Date(comment.date_time).toLocaleString()}):{" "}
              {comment.comment}
            </p>
          ))}

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "5px",
              maxWidth: "400px",
            }}
          >
            <input
              type="text"
              placeholder="Thêm bình luận..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                outline: "none",
              }}
              value={commentInput[photo._id] || ""}
              onChange={(e) =>
                setCommentInput({
                  ...commentInput,
                  [photo._id]: e.target.value,
                })
              }
            />
            <button
              onClick={() => handleSubmit(photo._id)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Gửi
            </button>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
