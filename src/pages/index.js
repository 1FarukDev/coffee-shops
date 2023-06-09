import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../../components/hero";
import Head from "next/head";
import Card from "../../components/card";
const inter = Inter({ subsets: ["latin"] });
import { fetchCoffeeStores } from "../../lib/coffee-store";
import useTrackLocation from "../../hooks/location";
import { useEffect, useState } from "react";
export default function Home(props) {
  const { handleTrackLocation, ll, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  const [coffeeStores, setCoffeeStores] = useState("");
  console.log({ ll, locationErrorMsg });
  const handleOnClick = () => {
    handleTrackLocation();
  };

  // useEffect(() => {
  //   async function setCoffeeStoresByLocation() {
  //     if (ll) {
  //       try {
  //         const fetchedCoffeeStores = await fetchCoffeeStores(ll);
  //         setCoffeeStores(fetchedCoffeeStores)
  //         // console.log({ fetchedCoffeeStores });
  //       } catch (error) {
  //         //set error
  //         console.error({ error });
  //       }
  //     }
  //   }
  //   // console.log(setCoffeeStoresByLocation);
  // }, [ll]);

  useEffect(() =>{
    if(ll){
      const fetchedCoffeeStores = fetchCoffeeStores(ll);
      console.log(fetchedCoffeeStores);
    }
  })

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
      {props.coffeestores.length > 0 && (
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
      {coffeeStores.length > 0 && (
        <>
          <h2 className="text-3xl mt-8 text-white flex justify-center">
            Stores near me
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
