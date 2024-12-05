import { features } from "../../data/feauture";

const Features = () => {
  // console.log(features);
  return (
    <>
      <div className="flex ">
        {features.map((feature) => (
          <div key={feature.id}>
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
