import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../../components/hero";
import Head from "next/head";
import Card from "../../components/card";
const inter = Inter({ subsets: ["latin"] });
import coffeestores from "../../data/coffee-stores.json";
export default function Home() {
  const handleOnClick = () => {
    console.log("Hello WOrld");
  };
  console.log(coffeestores);
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
      <div className="flex gap-8 flex-wrap my-8">
        {coffeestores.map((coffeestore) => {
          return (
            <Card
              name={coffeestore.name}
              href={`/coffee-store/${coffeestore.id}`}
              imgUrl={`/static/${coffeestore.image}`}
            />
          );
        })}
      </div>
    </div>
  );
}
