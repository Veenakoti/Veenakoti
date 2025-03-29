import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USER_OPERATION_SUCCESS,
  USER_OPERATION_FAILURE,
} from '../actions/userActions';

const initialState = {
  users: [],
  loading: false,
  error: '',
  successMessage: '',
  errorMessage: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload.updatedUser } : user
        ),
      };
    case USER_OPERATION_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        errorMessage: '',
      };
    case USER_OPERATION_FAILURE:
      return {
        ...state,
        successMessage: '',
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
