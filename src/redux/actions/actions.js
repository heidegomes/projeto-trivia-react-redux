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

// Essa action abaixo não esta sendo usada
export const setQuestions = (payload) => ({
  type: SET_QUESTION,
  payload,
});
