import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import coffeestoreData from "../../../data/coffee-stores.json";
import Head from "next/head";
import Image from "next/image";
function CoffeeStore(props) {
  const { name, address, image } = props.coffeeStore;
  // console.log(props, "props");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="text-white">
        <Link href="/">Back To Home</Link>
        <section className="lg:flex lg:flex-row  w-1/2 m-auto my-auto h-screen lg:justify-between align-center lg:items-center flex-col justify-center ">
          <div>
            <Image
              src={`/static/${image}`}
              width={300}
              height={300}
              alt="Coffee Image"
            />
          </div>
          <div>
            <p> {name}</p>
            <p> {address}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeestoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeestoreData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export default CoffeeStore;
