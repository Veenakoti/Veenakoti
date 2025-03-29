// src/components/Dashboard.jsx
import React from 'react';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UsersList from './UsersLists.jsx'; // Import UsersList to display within the Dashboard

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the login flag from localStorage and redirect to the login page
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div>
      {/* Dashboard Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content: Users List */}
      <Box sx={{ mt: 8, p: 3 }}>
        <UsersList />
      </Box>
    </div>
  );
};

export default Dashboard;
