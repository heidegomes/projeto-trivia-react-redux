import { ASSERTIONS_NUMBER } from '../actions/actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const player = (state = initialState, action) => {
  switch (action.type) {
  case 'action.user':
    return { ...state, gravatarEmail: action.payload.email, name: action.payload.name };
  case ASSERTIONS_NUMBER:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: action.payload,
    };
  default:
    return state;
  }
};
export default player;