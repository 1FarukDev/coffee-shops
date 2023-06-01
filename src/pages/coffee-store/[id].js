import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
function CoffeeStore() {
  const router = useRouter();
  return <div>
    <Link href="/">Back To Home</Link>
    CoffeeStore {router.query.id}
  </div>;
}

export default CoffeeStore;
