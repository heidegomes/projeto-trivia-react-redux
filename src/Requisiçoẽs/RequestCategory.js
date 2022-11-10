const requestCategory = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const request = await fetch(url);

  const data = await request.json();
  return data;
};

export default requestCategory;
