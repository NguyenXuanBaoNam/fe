import React, { useEffect, useState } from "react";
import {Typography} from "@mui/material";
import "./styles.css";
import {useParams, Link} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";


/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const data = await fetchModel(`/api/user/${userId}`);
      setUser(data);
    }
    getUser();
  }, [userId]);

  if (!user) return <Typography>Loading user data...</Typography>;

  return (
    <>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <p>Location: {user.location}</p>
      <p>Description: {user.description}</p>
      <p>Occupation: {user.occupation}</p>
      <p><Link to={`/photos/${user._id}`}>View Photos</Link></p>
    </>
  );
}

export default UserDetail;
