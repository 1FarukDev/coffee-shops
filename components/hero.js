import React from "react";
import HeroImg from "../public/static/hero-img.png";
import Image from "next/image";

export default function Hero(props) {
  return (
    <section className="bg-gradient-to-r from-secondary to-primary h-5/6  ">
      <main className="flex flex-col-reverse md:flex-row md:items-center md:justify-center mx-8  ">
        <div className=" mt-4 flex flex-col justify-center lg:justify-start lg:items-start items-center">
          <h1 className="font-Dancing lg:text-6xl  text-6xl coffee-header ">
            Coffee Connoisseur
          </h1>
          <p className="lg:mt-8 text-3xl text-secondary coffee-text ">
            Today's good mood is sponsored by coffee
            <br /> search for your coffee now
          </p>
          <button
            onClick={props.handleClick}
            className="bg-primary border border-white rounded-full text-white mt-6 p-4 px-8 text-secondary"
          >
            {props.buttonText}
          </button>
        </div>
        <div className="">
          <Image src={HeroImg} width={700} height={500} alt="Hero Image" />
        </div>
      </main>
    </section>
  );
}
