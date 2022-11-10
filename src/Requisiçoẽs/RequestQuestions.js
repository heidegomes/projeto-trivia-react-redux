const requestQuestions = async (Token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${Token}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export default requestQuestions;
