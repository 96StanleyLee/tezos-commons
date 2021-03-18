import React from "react";
import HistoryCard from "./HistoryCard";

function HistorySidebar({ setSidebar, donations }) {
  return (
    <div className="sidebar" onClick={() => setSidebar(false)}>
      <div className="donation_sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar_title">
          <h3> Recent Donations</h3>
        </div>

        <div className="donation_cards">
          {donations.map((donation) => {
            return <HistoryCard key={donation.timestamp} data={donation} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default HistorySidebar;
