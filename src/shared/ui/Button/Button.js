import "./Button.css";

export default function Button(props) {
  const { caption, onClick, type, disabled, style } = props;

  return (
    <button
      className={`button ${type === "submit" && "button_submit"}`}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {caption}
    </button>
  );
}
