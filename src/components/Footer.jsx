import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="p-10 bg-hero">
        <div className="flex justify-between ">
          <p className="font-bold text-xl">Re-flect</p>
          <div>
            <ul className="flex gap-8 cursor-pointer">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Profile</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="flex gap-5 cursor-pointer">
            <FaXTwitter />
            <FaInstagram />
            <CiLinkedin />
            <FaFacebook />
          </div>
        </div>

        <div className="flex justify-between mt-10 text-gray-400">
          <p>&copy; Re-flect 2024, All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of service</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
