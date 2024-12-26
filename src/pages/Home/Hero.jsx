import Button from "../../components/Button";
import heroImg from "../../assets/hero-img.svg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <section className="bg-hero pr-10 pl-10 flex gap-20 items-center">
        <div>
          <div className="pr-10 pl-10">
            <h2 className="font-bold text-6xl mb-5">
              Discover Yourself, One Entry at a Time
            </h2>
            <p className="text-xl mb-5">
              Re-flect empowers you to reflect on your day and gain valuable
              insights
            </p>
            <div className="flex gap-5">
              <Link to="/signup">
                <Button text="Sign Up for Free" color="white" />
              </Link>
              <Button
                text="Discover Re-Flect"
                color="black"
                transparency={true}
              />
            </div>
          </div>
        </div>
        <div>
          <img src={heroImg} alt="" className="rounded w-[1000px] h-[1000px]" />
        </div>
      </section>
    </>
  );
};

export default Hero;
