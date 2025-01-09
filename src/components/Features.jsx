import { features } from "../data/feauture";

const Features = () => {
  // console.log(features);
  return (
    <>
      <div className="px-16 py-16">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center justify-around mb-3 odd:flex-row-reverse"
          >
            <div className="">
              <h5 className="font-bold text-blue-500">{feature.title}</h5>
              <p className="font-bold text-gray-500">{feature.description}</p>
            </div>
            <div className="img">
              <img className="fixing" src={feature.img} alt={feature.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
