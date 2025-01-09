import { features } from "../data/feauture";

const Features = () => {
  // console.log(features);
  return (
    <>
      <div className="px-16 max-lg:px-2 py-16 max-lg:flex-col">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex max-lg:flex-col items-center justify-around mb-3 max-lg:odd:flex-col odd:flex-row-reverse"
          >
            <div className="">
              <h5 className="font-bold text-blue-500 text-start">{feature.title}</h5>
              <p className="font-bold text-gray-500 text-start">{feature.description}</p>
            </div>
            <div className="img max-lg:flex-col">
              <img className="fixing" src={feature.img} alt={feature.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
