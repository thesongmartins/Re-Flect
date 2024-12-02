import Button from "./Button";

const Header = () => {
  return (
    <>
      <div className="text-red-600">Header</div>
      <div>
        <Button text="Get Started" href="/login" color="Blue" />
      </div>
    </>
  );
};

export default Header;
