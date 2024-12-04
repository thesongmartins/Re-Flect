/* eslint-disable react/prop-types */
const Button = ({ text, href, color }) => {
  return (
    <div className="bg-blue-500 py-2 px-3 rounded-2xl">
      <a href={href} style={{ color: `${color}` }}>
        {text}
      </a>
    </div>
  );
};

export default Button;
