import Button from "../../components/Button";
import heroImg from "../../assets/hero-img.svg";
const Hero = () => {
  return (
    <>
      <section className="bg-hero p-10 mt-5 flex gap-20">
        <div>
          <h2>Discover Yourself, One Entry at a Time</h2>
          <p>
            Re-flect empowers you to reflect on your day and gain valuable
            insights
          </p>
          <div className="flex gap-5">
            <Button text="Sign Up for Free" href="/register" color="white" />
            <Button
              text="Discover Re-Flect"
              href="/register"
              color="black"
              transparency={true}
            />
          </div>
        </div>
        <div className="w-[500px] h-[500px]">
          <img src={heroImg} alt="" />
        </div>
      </section>
    </>
  );
};

export default Hero;
