import Button from "./Button";
import heroImg from "../assets/hero-img.svg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <section className="bg-hero pt-8 pb-8 pr-10 pl-10 flex gap-20 items-center mx-auto">
        <div>
          <div className="pr-10 pl-10">
            <h2 className="font-bold text-6xl mb-5 max-lg:text-center">
              Discover Yourself, One Entry at a Time
            </h2>
            <p className="text-xl mb-5 max-lg:text-lg w-full">
              Re-flect empowers you to reflect on your day and gain valuable
              insights
            </p>
            <div className="flex gap-5 mt-12 max-lg:flex-col max-lg:items-center">
              <Link to="/signup">
                <Button text="Sign Up for Free" color="white" />
              </Link>
              <Button
                text="Discover Re-flect"
                color="black"
                transparency={true}
              />
            </div>
          </div>
        </div>
        <div className=" max-lg:hidden">
          <img src={heroImg} alt="" className="rounded w-full ml-2" />
        </div>
      </section>
    </>
  );
};

export default Hero;
