import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <div>
      <nav className="navbar-inverse">
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
                  <Link to="/signup">Sign up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </div>
  );
}
