import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <div>
      <nav className="navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button 
              className="navbar-toggle collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-collapse" 
              aria-expanded="false"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Sondage</Link>
          </div>
          <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </div>
  );
}