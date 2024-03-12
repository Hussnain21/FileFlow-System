import React from "react";
import "./MainBody.css";

const MainBody = () => {
  let box1H = "Upload Files";
  let box2H = "Create Files";
  let box3H = "Create Folders";

  let box1T = " Drag and drop files. Our system supports various file formats";
  let box2T = "Create files as our system supports various file formats ";
  let box3T =
    "Create folders, add tags, and categorize your files for easy retrieval";
  return (
    <div className="container1">
      <div className="box2 large-box">
        <h2> {box1H} </h2>
        <p> {box1T} .</p>
      </div>
      <div className="box2 large-box">
        <h2> {box2H} </h2>
        <p> {box2T} .</p>
      </div>
      <div className="box2 large-box">
        <h2> {box3H} </h2>
        <p> {box3T} .</p>
      </div>
    </div>
  );
};

export default MainBody;
