import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="cursor-pointer bg-transparent hover:bg-gray-100 transition-all duration-200 p-3">
          <img src={urlFor(image && image[0])} width={250} height={250} />
          <p className="text-xl">{name}</p>
          <p className="font-bold">£{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
