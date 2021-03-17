import React, { useState } from "react";

export default function Modal({ project, donate, setActiveProject }) {
  const [defaultDonation, setdefaultDonation] = useState(1);
  const modalRemoveClick = (e) => {
    e.stopPropagation();
    setActiveProject({});
  };

  return (
    <div className="modal" onClick={(e) => modalRemoveClick(e)}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_description">
          <div className="modal_description_icon">
            <img src={project.icon} alt="project_icon" />
          </div>
          <div className="modal_description_title">
            <h2>{project.projectName}</h2>
          </div>
        </div>
        <div className="modal_donation">
          <input
            className="donation_input"
            type="number"
            min="1"
            step="0.1"
            value={defaultDonation}
            onChange={(e) => setdefaultDonation(e.target.value)}
          />
          <button
            className="donate_submit"
            onClick={() => donate(defaultDonation, project)}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}
