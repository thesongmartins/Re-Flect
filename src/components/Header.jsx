import Button from "./Button";

const Header = () => {
  return (
    <>
      <header className="bg-white flex justify-between items-center pt-5">
        <p className="ml-20 font-bold">Re-Flect</p>
        <nav>
          <ul className="flex gap-5 mr-20 items-center">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Notifications</a>
            </li>
            <li>
              <a href="#">Log In</a>
            </li>
            <li>
              <a href="#">
                <Button text="Get Started" href="/login" color="Blue" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
