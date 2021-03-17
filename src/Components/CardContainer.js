import React from "react";
import Card from "./Card";
import Modal from "./Modal";

export default function CardContainer({
  projects,
  setActive,
  user,
  updateProjects,
}) {
  return (
    <>
      <div className="container">
        <div className="card_wrapper">
          {projects.map((project) => (
            <Card
              key={project.id}
              data={project}
              setActive={setActive}
              user={user}
              updateProjects={updateProjects}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}
