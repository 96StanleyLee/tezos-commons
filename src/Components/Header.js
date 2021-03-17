import React, { useState } from "react";

function Header() {
  const [waveAnimation, setWaveAnimation] = useState("wave");

  return (
    <div className="header">
      <div className="container">
        <span
          onClick={() => setWaveAnimation("wave")}
          onAnimationEnd={() => setWaveAnimation("")}
          className={`waveEmoji ${waveAnimation}`}
        >
          👋
        </span>
        <h4 className="header_font">
          Hi, Welcome to tzStanley,<br></br>
          the number one location to find and donate to
          <br></br>upcoming projects that spark your interests and more.
        </h4>
      </div>
    </div>
  );
}

export default Header;
