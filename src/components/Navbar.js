import React, { useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const Navbar = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { user, getUser } = context;

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.showAlert('Logged out Successfully', 'success');
    navigate('/login');
  };

  let location = useLocation();
  
  useEffect(() => {
    getUser();
  }, [getUser]);
  // const username = user.name ? user.name.replace(/\b\w/g, (char) => char.toUpperCase()) : '';


   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top " style={{ backgroundColor: '#121414' }}>
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          <i className="fa-solid fa-tablet-screen-button"></i> iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/main' ? 'active' : ''}`} aria-current="page" to="/main">
                WORK SPACE
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                ABOUT
              </Link>
            </li>
          </ul>
          {localStorage.getItem('token') ? 
            <div className="d-flex align-items-center ">
              <span className="text-white text-capitalize ">
                Hii! <span style={{ color: '#97FEED' }}>{user.name}</span>
              </span>
              <div className="user-icon mx-3">
              <Link to="/getuser">
                <i className="fa-solid fa-user-graduate fa-2x" style={{ color: '#A1CCD1' }}></i>
                </Link>
              </div>
              <button className="btn btn-sm mx-2 custom-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
           : 
            <form className="d-flex">
              <Link className="custom-button mx-1 " to="/login" role="button">
                Login
              </Link>
              <Link className="custom-button mx-1 " to="/signup" role="button">
                Sign Up
              </Link>
            </form>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
