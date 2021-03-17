import React, { useState } from "react";

export default function Card({ data, setProject, user }) {
  const [pictureType, setpictureType] = useState("static");

  const style = {
    backgroundImage:
      pictureType === "static" ? `url(${data.picture})` : `url(${data.gif})`,
  };

  return (
    <>
      <div className="card">
        <h3>{data.projectName}</h3>
        <div
          onMouseEnter={() => setpictureType("gif")}
          onMouseLeave={() => setpictureType("static")}
          style={style}
          className="card_picture"
        ></div>
        <div className="donate_button">
          {Object.keys(user).length > 0 ? (
            <button className="donate" onClick={() => setProject(data)}>
              Donate
            </button>
          ) : (
            <p style={{ color: "red" }}>Please login to donate!</p>
          )}
        </div>

        {data.status !== "none" && data.status !== "pending" && (
          <p>Your donation has {data.status}</p>
        )}

        <p>{data.description}</p>
      </div>
    </>
  );
}
