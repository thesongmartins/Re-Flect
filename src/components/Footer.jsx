const Footer = () => {
  return (
    <>
      <footer className="flex justify-between p-10 bg-gray-200">
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
          {/* <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
          <FontAwesomeIcon icon="fa-brands fa-instagram" />
          <FontAwesomeIcon icon="fa-brands fa-linkedin" />
          <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
