import { div } from "@tensorflow/tfjs";
import React from "react";
import { useParams } from "react-router-dom";

const PublicProfile = () => {
  const { username,id } = useParams();
  return (
    <div>
      <h3>UserName</h3>
      <br />
      <p>{username}</p>
      <h2>ID</h2>
      <p>{id}</p>
    </div>
  );
};

export default PublicProfile;
