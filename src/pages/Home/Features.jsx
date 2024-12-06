import { features } from "../../data/feauture";

const Features = () => {
  // console.log(features);
  return (
    <>
      <div className="">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex align-center items-center gap-5 font-bold text-blue-500 odd:flex-row-reverse"
          >
            <h5>{feature.title}</h5>
            <p>{feature.description}</p>
            <img src={feature.img} alt={feature.title} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
