import { createApi } from "unsplash-js";

// on your node server
const serverApi = createApi({
  accessKey: process.env.unsplash,
  //...other fetch options
});

const coffeeImage = async () => {
  const photos = await serverApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 10,
  });
  const unSplashResults = photos.response.results;
  return unSplashResults.map((result) => result.urls["small"]);
};
export const fetchCoffeeStores = async () => {
  const photos = await coffeeImage();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.authorisation,
    },
  };
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${process.env.geo}&categories=13035`,
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) =>{
    return{
      ...result,
      imgUrl: photos[idx]
    }
  });
};
