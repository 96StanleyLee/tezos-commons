import React, { useState } from "react";
import Status from "./Status";

export default function Card({ data, setActive, user, updateProjects }) {
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
            <button
              disabled={data.status === "pending"}
              className="donate"
              onClick={() => setActive(data)}
            >
              Donate
            </button>
          ) : (
            <p style={{ color: "red" }}>Please login to donate!</p>
          )}
        </div>

        {data.status !== "none" && data.status !== "pending" && (
          <div className={data.status}>Your donation has</div>
        )}

        {data.status === "pending" && (
          <Status updateProjects={updateProjects} data={data} />
        )}

        <p>{data.description}</p>
      </div>
    </>
  );
}
