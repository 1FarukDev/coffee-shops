import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Prompt } from "next/font/google";
function Card(props) {
  return (
    <Link href={props.href}>
      <section className="flex flex-col justify-center w-max border ">
        <Image src={props.imgUrl} width={260} height={160} />
        <h2 className="text-white flex justify-center">{props.name}</h2>
      </section>
    </Link>
  );
}

export default Card;
