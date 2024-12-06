/* eslint-disable react/prop-types */
const Button = ({ text, href, color, transparency }) => {
  return (
    <div
      className={
        transparency
          ? "bg-transparent inline-block py-2 px-3 rounded-2xl"
          : "bg-blue-500 inline-block py-2 px-3 rounded-2xl"
      }
    >
      <a href={href} style={{ color: `${color}` }}>
        {text}
      </a>
    </div>
  );
};

export default Button;
