import React from "react";

function Navbar({ login, logout, user, sideBar, setSidebar }) {
  return (
    <div className="nav">
      <div className="nav_container">
        <div className="title">
          <h2>tzStanley </h2>
        </div>
        <div className="nav_right">
          {Object.keys(user).length === 0 ? (
            <button className="loginButton" onClick={login}>
              Login
            </button>
          ) : (
            <>
              <div>
                {user.address.substring(0, user.address.length - 30) +
                  "*".repeat(5)}
              </div>
              <button
                onClick={() => setSidebar(!sideBar)}
                className="historyButton"
              >
                History
              </button>
              <button className="logoutButton" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
