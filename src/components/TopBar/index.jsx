import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar({ user, onLogout }) {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchTitle() {
      if (!user) { setTitle(""); return; }

      const path = location.pathname;
      if (path.startsWith("/users/") || path.startsWith("/photos/")) {
        const userId = path.split("/")[2];
        try {
            const u = await fetchModel(`/api/user/${userId}`);
            if (u) {
                if (path.startsWith("/users/")) setTitle(`${u.first_name} ${u.last_name}`);
                else if (path.startsWith("/photos/")) setTitle(`Photos of ${u.first_name} ${u.last_name}`);
            }
        } catch(e) {}
      } else if (path === "/upload") {
        setTitle("Upload Photo");
      } else {
        setTitle("User List");
      }
    }
    fetchTitle();
  }, [location.pathname, user]);

  return (
    <AppBar position="absolute" style={{ background: "#1976d2" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
            B22DCAT205 - Nguyen Xuan Bao Nam
        </Typography>
        <Typography variant="h6">
            {title}
        </Typography>
        <div style={{ display: "flex", gap: "10px" }}>
            {user ? (
                <>
                    <span style={{ fontSize: "1.2rem", alignSelf: "center" }}>Hi {user.first_name}</span>
                    
                    <Link to="/upload">
                        <button>Add Photo</button>
                    </Link>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <span style={{ fontSize: "1.2rem" }}>Please Login</span>
            )}
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
