import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../../components/hero";
import Head from "next/head";
import Card from "../../components/card";
const inter = Inter({ subsets: ["latin"] });
import coffeestoresData from "../../data/coffee-stores.json";
export default function Home(props) {
  const handleOnClick = () => {
    console.log("Hello WOrld");
  };
  console.log("props", props);
  return (
    <div>
      <Head>
        <title>Coffee Connoisseur</title>
      </Head>
      <section className="text-secondary">
        <Hero
          buttonText="View store nearby"
          className="text-secondary"
          handleClick={handleOnClick}
        />
      </section>
      {props.coffeestores.length > 0 && (
        <>
          <h2 className="text-3xl mt-8 text-white">Toronto Stores</h2>
          <div className="flex gap-8 flex-wrap ">
            {props.coffeestores.map((coffeestore) => {
              return (
                <Card
                  key={coffeestore.id}
                  name={coffeestore.name}
                  href={`/coffee-store/${coffeestore.id}`}
                  imgUrl={`/static/${coffeestore.image}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
export async function getStaticProps(context) {
  return {
    props: {
      coffeestores: coffeestoresData,
    },
  };
}
