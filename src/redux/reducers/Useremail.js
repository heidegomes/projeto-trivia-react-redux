const initialState = {
  email: '',
  name: '',
  score: 0,
};
const user = (state = initialState, action) => {
  switch (action.type) {
  case 'action.user':
    return { ...state, email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
};
export default user;
