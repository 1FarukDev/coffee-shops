import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import coffeestoreData from "../../../data/coffee-stores.json";
import Head from "next/head";
import Image from "next/image";
import { fetchCoffeeStores } from "../../../lib/coffee-store";
function CoffeeStore(props) {
  const { name, address, imgUrl, location } = props.coffeeStore;
  console.log(props.coffeeStore);
  // console.log(props, "props");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="text-white ">
        <Link href="/" className="font-dancing">← Back to home</Link>
        <section className="lg:flex lg:flex-row  w-1/2 m-auto my-auto h-screen lg:justify-between align-center lg:items-center flex-col justify-center ">
          <div className="">
            <Image
              src={imgUrl || "/static/card.png"}
              width={300}
              height={200}
              alt="Coffee Image"
            />
          </div>
          <div>
            <p>{name}</p>
            <p>{address}</p>
            <p>{location.address}</p>
          </div>
        </section>
      </div>
    </>
  );
}

// export async function getStaticProps(staticProps) {
//   const params = staticProps.params;
//   const coffeestores = await fetchCoffeeStores();
//   return {
//     props: {
//       coffeeStore: coffeestores.find((coffeeStore) => {
//         return coffeeStore.fsq_id.toString() === params.id;
//       }),
//     },
//   };
// }

// export async function getStaticPaths() {
//   const coffeestores = await fetchCoffeeStores();
//   console.log(fetchCoffeeStores);
//   const paths = coffeestores.map((coffeeStore) => {
//     return {
//       params: {
//         id: coffeeStore.fsq_id.toString(),
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: true,
//   };
// }
export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

// export async function getStaticProps(context) {
//   // console.log(context);

//   const { params } = context;
//   const response = await fetchCoffeeStores();
//   const coffeeStore = await response.json();

//   return {
//     props: {
//       // property: data,
//       coffeeStore,
//     },
//   };
// }
export default CoffeeStore;
