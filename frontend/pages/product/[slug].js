import React, { useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

import { client, urlFor } from "../../lib/client";

import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart, size, setSize } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="flex sm:flex-col md:flex-col lg:flex-row  justify-center lg:gap-40 m-20 mb-1">
        <div>
          <div>
            <img
              src={urlFor(image && image[index])}
              className="w-96 h-96 cursor-pointer"
            />
          </div>
          <div className="flex gap-2.5 mt-3">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index
                    ? "cursor-pointer w-16 h-16"
                    : "cursor-pointer w-16 h-16 bg-red-900"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1>{name}</h1>

          <div className="text-sm py-3">Product Description: </div>
          <p>{details}</p>
          <p>
            <div className="flex">
              <button onClick={() => setSize(0)}>A4</button>
              <button onClick={() => setSize(1)}>A3</button>
              <button onClick={() => setSize(2)}>A2</button>
            </div>
          </p>
          <p className="font-bold text-2xl lg:mt-12">£{price[size]}</p>
          <div className="flex gap-5 mt-3 items-center text-xl">
            <h3>Quantity:</h3>
            <p className="flex justify-center items-center">
              <span onClick={decQty}>
                <AiFillMinusSquare size={32} />
              </span>
              <span className=" w-6 text-center mt-0 pt-0">{qty}</span>
              <span onClick={incQty}>
                <AiFillPlusSquare size={32} />
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 border-2 border-solid mt-2 text-xl font-bold cursor-pointer w-44"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="p-2 border-2 border-solid mt-2 text-xl font-bold cursor-pointer w-44"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product.size);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
