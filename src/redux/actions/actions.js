export const userAction = (dados) => ({
  type: 'action.user',
  payload: dados,
});

// Essa action abaixo não esta sendo usada
export const setQuestions = (payload) => ({
  type: SET_QUESTION,
  payload,
});
