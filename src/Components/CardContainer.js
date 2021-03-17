import React from "react";
import Card from "./Card";
import Modal from "./Modal";

export default function CardContainer({ projects, setActive, user }) {
  return (
    <>
      <div className="container">
        <div className="card_wrapper">
          {projects.map((project) => (
            <Card
              key={project.id}
              data={project}
              setProject={setActive}
              user={user}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}
