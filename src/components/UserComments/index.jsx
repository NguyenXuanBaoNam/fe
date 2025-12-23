import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`https://d5jzq4-8081.csb.app/api/user/commentsOfUser/${userId}`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    }

    async function fetchUserInfo() {
      const res = await fetch(`https://d5jzq4-8081.csb.app/api/user/${userId}`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setUserInfo(data);
      }
    }

    fetchComments();
    fetchUserInfo();
  }, [userId]);

  const styles = {
    wrapper: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "30px 20px",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: "#333",
    },
    header: {
      fontSize: "24px",
      marginBottom: "20px",
      borderBottom: "2px solid #eee",
      paddingBottom: "10px",
      color: "#2c3e50"
    },
    commentItem: {
      backgroundColor: "#fff",
      border: "1px solid #e1e4e8",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "16px",
      listStyle: "none",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
    },
    photoLink: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "500",
      marginLeft: "5px"
    },
    commentText: {
      margin: "12px 0",
      fontSize: "16px",
      lineHeight: "1.5",
      fontStyle: "italic",
      color: "#4a4a4a"
    },
    meta: {
      fontSize: "0.85em",
      color: "#6a737d",
      display: "flex",
      justifyContent: "flex-end"
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      color: "#999",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px"
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>
        Bình luận của {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : "Người dùng"}
      </h2>
      
      {comments.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {comments.map((c, index) => (
            <li key={index} style={styles.commentItem}>
              <div style={{ fontSize: "0.9em", color: "#555" }}>
                Tại ảnh: 
                <Link to={`/photos/${c.owner_id}`} style={styles.photoLink}>
                  {c.file_name}
                </Link>
              </div>
              
              <div style={styles.commentText}>
                "{c.comment}"
              </div>
              
              <div style={styles.meta}>
                {new Date(c.date_time).toLocaleString("vi-VN")}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={styles.emptyState}>
          <p>Chưa có bình luận nào để hiển thị.</p>
        </div>
      )}
    </div>
  );
}

export default UserComments;