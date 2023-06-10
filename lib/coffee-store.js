import { createApi } from "unsplash-js";

// on your node server
const serverApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_unsplash,
  //...other fetch options
});

const coffeeImage = async () => {
  const photos = await serverApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  const unSplashResults = photos.response.results;
  return unSplashResults.map((result) => result.urls["small"]);
};
export const fetchCoffeeStores = async (ll ="41.8781,-87.6298") => {
  const photos = await coffeeImage();

  const searchParams = new URLSearchParams({
    query: "coffee",
    ll: `${ll}`,  
    open_now: "true",
    sort: "DISTANCE",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_authorisation,
    },
  };
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?${searchParams}`,
    options
  );

  const data = await response.json();

  return data.results.map((result, idx) => {
    return {
      ...result,
      imgUrl: photos[idx],
    };
  });
};

