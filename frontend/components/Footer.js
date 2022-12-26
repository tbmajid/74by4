import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className=" flex flex-col justify-center items-center  mt-9">
      <p>2022 74by4.com All rights reserverd</p>
      <div>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </div>
    </div>
  );
};

export default Footer;
