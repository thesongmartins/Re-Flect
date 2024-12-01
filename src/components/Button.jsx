/* eslint-disable react/prop-types */
const Button = ({ text, href, color }) => {
  return (
    <div>
      <a href={href} style={{ color: `${color}` }}>
        {text}
      </a>
    </div>
  );
};

export default Button;
