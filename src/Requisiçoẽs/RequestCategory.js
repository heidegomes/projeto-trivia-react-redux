const requestCategory = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const request = await fetch(url);
  return request.json();
};

export default requestCategory;
