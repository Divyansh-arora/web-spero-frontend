import axios from 'axios';

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://web-spero-backend.onrender.com/loginuser/user', userData);
      const token = response.data.token;
      dispatch({ type: 'LOGIN_SUCCESS', payload: token });
      //localStorage.setItem('token', token);
    } catch (error) {
      const er = (error.response.data?.message ? error.response.data.message : error.response.data?.error ? error.response.data.error : 'An error occurred');
      dispatch({ type: 'LOGIN_FAILURE', payload: er });
    }
  };
};
