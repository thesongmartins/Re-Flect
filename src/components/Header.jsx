import Button from "./Button";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <>
      <header className="bg-white flex justify-between items-center p-5">
        <p className="ml-20 font-bold text-5xl">Re-flect</p>
        <nav>
          <ul className="flex gap-7 md:gap-5 mr-20 items-center">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li className="flex flex-row gap-[2px] items-center">
              <IoIosNotifications />
              <a href="#">Notifications</a>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">
                <Button text="Get Started" color="white" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
