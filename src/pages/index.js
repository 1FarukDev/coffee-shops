import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../../components/hero";
import Head from "next/head";
import Card from "../../components/card";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleOnClick = () => {
    console.log("Hello WOrld");
  };
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
      <Card name="DarkHouse Coffee" href="/coffee-store/darkhorse-coffee" imgUrl="/static/card.png"/>
    </div>
  );
}
