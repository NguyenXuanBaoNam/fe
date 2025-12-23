import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const data = await fetchModel("/api/user/list");
      console.log("User list:", data);
      setUsers(Array.isArray(data) ? data : []);
    }
    getUsers();
  }, []);

  return (
    <div>
      <Typography variant="body1"></Typography>

      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem>
              <Link to={`/users/${item._id}`}>
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                />
              </Link>
              <Badge
                badgeContent={item.photo_count}
                color="success"
                sx={{ ml: 3 }}
                showZero
              />
              <Link
                to={`/comments/${item._id}`}
                style={{ textDecoration: "none", display: "flex" }}
              >
                <Badge
                  badgeContent={item.comment_count}
                  color="error"
                  sx={{ ml: 3, cursor: "pointer" }}
                  showZero
                />
              </Link>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
