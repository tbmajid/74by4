import css from "../styles/Header.module.css";

import Image from "next/image";
const Header = () => {
  return (
    <>
      <div>
        <Image
          src="/logo-black.svg"
          alt="logo"
          width={200}
          height={125}
          quality={75}
        />
      </div>
    </>
  );
};

export default Header;
