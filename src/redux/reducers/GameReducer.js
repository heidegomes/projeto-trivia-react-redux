import { SET_QUESTION } from '../actions/actions';

const INITIAL_STATE = ({
  score: 0,
  page: 0,
  questions: [],
  question: [],
});

const gamer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTION:
    return { ...state, questions: action.payload, question: action.payload[state.page] };
  default:
    return state;
  }
};
export default gamer;
