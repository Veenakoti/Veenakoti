import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, removeUser } from '../actions/userActions';
import { Button, Card, CardContent, Typography, Grid, Container, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, successMessage, errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', marginTop: 3 }}>
        Users List
      </Typography>
      {loading && <CircularProgress color="primary" sx={{ display: 'block', margin: 'auto', marginBottom: 3 }} />}
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ marginBottom: 2 }}>{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

      <Grid container spacing={4}>
        {users && users.length > 0 ? (
          users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden', height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    width="80"
                    height="80"
                    style={{ borderRadius: '50%', marginBottom: '16px' }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '16px' }}>
                    {user.email}
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(user.id)}
                        sx={{
                          padding: '8px 16px',
                          backgroundColor: '#1976d2',
                          '&:hover': { backgroundColor: '#1565c0' },
                        }}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                        sx={{
                          padding: '8px 16px',
                          borderColor: '#d32f2f',
                          color: '#d32f2f',
                          '&:hover': { borderColor: '#c62828', color: '#c62828' },
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No users found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default UsersList;
