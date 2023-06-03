import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Prompt } from "next/font/google";
function Card(props) {
  return (
    <div className="flex gap-8 flex-wrap my-8">
      <Link href={props.href}>
        <section className="flex flex-col justify-center w-max  ">
          <Image src={props.imgUrl} width={260} height={160} alt="Card Image"/>
          <h2 className="text-white flex justify-center bg-cardText font-mono">
            {props.name}
          </h2>
        </section>
      </Link>
  
    </div>
  );
}

export default Card;
