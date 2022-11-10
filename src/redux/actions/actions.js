export const SET_QUESTION = 'set_question';

export const userAction = (dados) => ({
  type: 'action.user',
  payload: dados,
});

export const setQuestions = (payload) => ({
  type: SET_QUESTION,
  payload,
});
