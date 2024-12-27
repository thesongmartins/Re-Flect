import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
