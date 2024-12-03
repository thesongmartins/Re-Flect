import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer className="p-10 bg-gray-200">
        <div className="flex justify-between ">
          <p className="text-bold text-xl">Re-Flect</p>
          <div>
            <ul className="flex gap-10">
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

          <div>
            <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <p>&copy; Re-Flect 2024, All rights reserved.</p>
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
