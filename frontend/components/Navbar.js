import Link from "next/link";
import { AiOutlineShopping, BiUserCircle } from "react-icons/ai";
import Image from "next/image";

import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import User from "./Users";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="flex justify-between my-1 mx-2 relative">
      <p>
        <Link href="/">
          <a>
            <Image
              src="/logo-black.svg"
              alt="logo"
              width={200}
              height={125}
              quality={75}
            />
          </a>
        </Link>
      </p>
      <div className="flex">
        <User className="pr-24" />
        <button
          type="button"
          className="text-2xl text-gray-800 cursor-pointer relative transition-transform border-none bg-transparent"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping size={40} />
          <span className="absolute -right-2 text-xs text-white bg-rose-600 w-5 h-5 rounded-full text-center font-semibold">
            {totalQuantities}
          </span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
