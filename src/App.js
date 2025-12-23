import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import PhotoUpload from "./components/PhotoUpload";
import UserComments from "./components/UserComments";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
        await fetch("https://d5jzq4-8081.csb.app/admin/logout", { method: "POST", credentials: "include" });
    } catch(e) {}
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <Grid container spacing={2}>
        <Grid item xs={12}>
           <TopBar user={user} onLogout={handleLogout} />
           <div className="main-topbar-buffer" /> 
        </Grid>
        {!user ? (
            <Grid item xs={12}>
                <LoginRegister onLogin={(u) => setUser(u)} />
            </Grid>
        ) : (
            <> 
                <Grid item sm={3}>
                    <Paper className="main-grid-item">
                        <UserList />
                    </Paper>
                </Grid>
                
                <Grid item sm={9}>
                    <Paper className="main-grid-item">
                        <Routes>
                            <Route path="/users/:userId" element={<UserDetail />} />
                            <Route path="/photos/:userId" element={<UserPhotos />} />
                            <Route path="/comments/:userId" element={<UserComments />} />
                            <Route path="/upload" element={<PhotoUpload user={user} />} />
                            <Route path="/" element={<h2>Xin chao {user.first_name}!</h2>} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Paper>
                </Grid>
            </>
        )}
      </Grid>
    </Router>
  );
}

export default App;