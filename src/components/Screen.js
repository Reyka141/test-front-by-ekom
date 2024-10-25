import "./Screen.css";

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");

const Screen = ({ value, expression }) => {
  return (
    <div className="screen" mode="single" max={70}>
      <div className="topSide">{expression ? expression : '⠀'}</div>
      <div className="bottomSide">{toLocaleString(value)}</div>
    </div>
  );
};

export default Screen;