import React, { useState } from "react";

export default function Modal({ project, donate, setActiveProject }) {
  const [defaultDonation, setdefaultDonation] = useState(1);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="modal" onClick={() => setActiveProject({})}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_description">
          <div className="modal_description_icon">
            <img src={project.icon} alt="project_icon" />
          </div>
          <div className="modal_description_title">
            <h2>{project.projectName}</h2>
          </div>
        </div>
        <p>The minimum amount of Tezos required to donate is at least 1.</p>
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
            disabled={disabled}
            onClick={() => {
              donate(defaultDonation, project);
              setDisabled(true);
            }}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}
