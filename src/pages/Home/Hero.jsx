import Button from "../../components/Button";
const Hero = () => {
  return (
    <>
      <section className="bg-gray-200 p-10 flex mt-5">
        <div>
          <h2>Discover Yourself, One Entry at a Time</h2>
          <p>
            Re-flect empowers you to reflect on your day and gain valuable
            insights
          </p>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </section>
      <Button text="Sign Up for Free" href="/register" color="Green " />
    </>
  );
};

export default Hero;
