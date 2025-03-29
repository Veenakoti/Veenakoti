import React from 'react';
import { useDispatch } from 'react-redux';
import { syncUsers } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from Redux state
    dispatch(syncUsers());

    // Clear user data from sessionStorage
    sessionStorage.clear();

    // Clear user data from localStorage
    localStorage.clear();

    // Optionally, clear other session-related data
    // For example, clearing cookies can be done by setting them with an expired date
    // document.cookie = "your_cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
