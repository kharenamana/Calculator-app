import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Navbar = (props) => {
  const [, setError] = useState('');
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch (e) {
      console.log(e);
      setError('Failed to Logout!');
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Calculator
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        {/* <strong>Email: {currentUser.email}</strong> */}
        <button
          className="btn btn-outline-primary  my-2 my-sm-0"
          variant="link"
          type="submit"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
