import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../../components/hero";
import Head from "next/head";
import Card from "../../components/card";
const inter = Inter({ subsets: ["latin"] });
import { fetchCoffeeStores } from "../../lib/coffee-store";
import useTrackLocation from "../../hooks/location";
import { useEffect, useState } from "react";
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
export default function Home(props) {
  const [coffeeStores, setCoffeeStores] = useState("");
  const { handleTrackLocation, ll, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // console.log({coffeeStores});
  console.log({ ll, locationErrorMsg });
  const handleOnClick = () => {
    handleTrackLocation();
  };

  async function field() {
    const photos = await coffeeImage();
    if (ll) {
      const searchParams = new URLSearchParams({
        query: "coffee",
        ll: `${ll}`,
        open_now: "false",
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
      const coffeeStores = await response.json();
      // console.log("coffeeStores", coffeeStores.results);
      return coffeeStores.results.map((result, idx) => {
        return {
          ...result,
          imgUrl: photos[idx],
        };
      });
    }
  }
  useEffect(() => {
    field()
      .then((responseData) => {
        setCoffeeStores(responseData);
        // console.log("setCoffeeStores", setCoffeeStores);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [ll]);
  console.log({ coffeeStores });
  return (
    <div>
      <Head>
        <title>Coffee Connoisseur</title>
      </Head>
      <section className="text-secondary">
        <Hero
          buttonText={isFindingLocation ? "Loading" : "View store nearby"}
          className="text-secondary"
          handleClick={handleOnClick}
        />
      </section>

      {coffeeStores && (
        <>
          <h2 className="text-3xl mt-8 text-white flex justify-center">
            Coffee Stores Near Your
          </h2>
          <div className="lg:grid justify-center gap-4  lg:grid-cols-3  lg:w-4/6 m-auto   grid grid-cols-2 px-4">
            {coffeeStores.map((coffeestore) => {
              return (
                <div className="">
                  <Card
                    key={coffeestore.fsq_id}
                    name={coffeestore.name}
                    // id={coffeestore.id}
                    href={`/coffee-store/${coffeestore.fsq_id}`}
                    imgUrl={coffeestore.imgUrl || "/static/card.png"}
                    location={coffeestore.location.address}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      {!ll && props.coffeestores.length > 0 && (
        <>
          <h2 className="text-3xl mt-8 text-white flex justify-center">
            Toronto Stores
          </h2>
          <div className="lg:grid justify-center gap-4  lg:grid-cols-3  lg:w-4/6 m-auto   grid grid-cols-2 px-4">
            {props.coffeestores.map((coffeestore) => {
              return (
                <div className="">
                  <Card
                    key={coffeestore.fsq_id}
                    name={coffeestore.name}
                    // id={coffeestore.id}
                    href={`/coffee-store/${coffeestore.fsq_id}`}
                    imgUrl={coffeestore.imgUrl || "/static/card.png"}
                    location={coffeestore.location.address}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* {
        coffeeStores.results.length > 0 && <>
        {
          coffeeStores.results.map((coffeestore) => {
            return(
              <Card 
              name={coffeestore.name}
              />
            )
          })
        }
        </>
      } */}
    </div>
  );
}
export async function getStaticProps(context) {
  const coffeestores = await fetchCoffeeStores();
  return {
    props: {
      coffeestores: coffeestores,
    },
  };
}
// ...........................................