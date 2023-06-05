export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.authorisation,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?ll=41.8781%2C-87.6298&categories=13035",
    options
  );
  const data = await response.json();
  console.log(data);

  return data.results;
};
