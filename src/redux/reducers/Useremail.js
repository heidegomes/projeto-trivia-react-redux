import { ASSERTIONS_NUMBER, RESET_SCORE, SAVE_RANKING } from '../actions/actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  playersRanking: [],
};
const player = (state = initialState, action) => {
  switch (action.type) {
  case 'action.user':
    return { ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case ASSERTIONS_NUMBER:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
    };
  case SAVE_RANKING:
    return {
      ...state,
      playersRanking: [...state.playersRanking, { email: state.gravatarEmail,
        name: state.name,
        score: state.score }],
    };
  default:
    return state;
  }
};
export default player;
