import axios from 'axios';

// Action Types
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

export const UPDATE_USER = 'UPDATE_USER';
export const USER_OPERATION_SUCCESS = 'USER_OPERATION_SUCCESS';
export const USER_OPERATION_FAILURE = 'USER_OPERATION_FAILURE';

// Action Creators
export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });
export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const deleteUser = (id) => ({ type: DELETE_USER, payload: id });
export const updateUser = (id, updatedUser) => ({ type: UPDATE_USER, payload: { id, updatedUser } });
export const userOperationSuccess = (message) => ({ type: USER_OPERATION_SUCCESS, payload: message });
export const userOperationFailure = (message) => ({ type: USER_OPERATION_FAILURE, payload: message });

// Thunk Actions
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get('https://reqres.in/api/users?page=1');
    dispatch(fetchUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchUsersFailure('Failed to fetch users'));
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://reqres.in/api/users', user);
    dispatch(addUser(response.data));
    dispatch(userOperationSuccess('User added successfully!'));
  } catch (error) {
    dispatch(userOperationFailure('Failed to add user.'));
  }
};

export const removeUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    dispatch(deleteUser(id));
    dispatch(userOperationSuccess('User deleted successfully!'));
  } catch (error) {
    dispatch(userOperationFailure('Failed to delete user.'));
  }
};

export const modifyUser = (id, updatedUser) => async (dispatch) => {
  try {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, updatedUser);
    dispatch(updateUser(id, response.data));
    dispatch(userOperationSuccess('User updated successfully!'));
  } catch (error) {
    dispatch(userOperationFailure('Failed to update user.'));
  }
};
