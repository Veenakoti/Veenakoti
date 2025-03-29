import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyUser } from '../actions/userActions';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.users.find((user) => user.id === parseInt(id)));

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setUserData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.first_name || !userData.last_name || !userData.email) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    // Dispatch the action to update the user
    dispatch(modifyUser(id, userData));

    // Handle the success and error flow
    setSuccess('User updated successfully!');
    setError('');
    navigate('/dashboard'); // Redirect to dashboard after successful update
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First Name"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Update User
        </Button>
      </Box>
    </Container>
  );
};

export default EditUser;
