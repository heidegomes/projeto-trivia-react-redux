export const SET_QUESTION = 'SET_QUESTION';
export const ASSERTIONS_NUMBER = 'ASSERTIONS_NUMBER';

export const userAction = (dados) => ({
  type: 'action.user',
  payload: dados,
});

export const saveAssertions = (dados) => ({
  type: ASSERTIONS_NUMBER,
  payload: dados,
});

const setResults = (dados) => ({
  type: 'SET_QUESTION',
  payload: dados,
});

export default setResults;
