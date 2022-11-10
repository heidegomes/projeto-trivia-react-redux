const requestQuestions = async (Qtd, Token) => {
  const url = `https://opentdb.com/api.php?amount=${Qtd}&token=${Token}`;
  const request = await fetch(url);
  return request.json();
};

export default requestQuestions;
