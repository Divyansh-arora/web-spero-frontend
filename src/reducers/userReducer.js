const initialState = {
  token: null, 
  error: null ,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        token: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
