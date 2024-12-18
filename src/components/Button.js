import "./Button.scss";
import {
  faDivide,
  faXmark,
  faDeleteLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ className, value, onClick }) => {
  let result;
  switch (value) {
    case "<":
      result = <FontAwesomeIcon icon={faDeleteLeft} />;
      break;
    case "+-":
      result = (
        <svg
          width="25"
          height="22"
          viewBox="0 0 25 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.3321 2.55469L19.8867 1.72264L18.2226 0.613235L17.6679 1.44529L5.66795 19.4453L5.11325 20.2773L6.77735 21.3867L7.33205 20.5547L19.3321 2.55469ZM5.5 0.999985V1.99998V3.99998H7.5H8.5V5.99998H7.5H5.5V7.99998V8.99998H3.5V7.99998V5.99998H1.5H0.5V3.99998H1.5H3.5V1.99998V0.999985H5.5ZM17.5 16H16.5V18H17.5H23.5H24.5V16H23.5H17.5Z"
            fill="black"
          />
        </svg>
      );
      break;
    case "/":
      result = <FontAwesomeIcon icon={faDivide} />;
      break;
    case "X":
      result = <FontAwesomeIcon icon={faXmark} />;
      break;
    case "-":
      result = <FontAwesomeIcon icon={faMinus} />;
      break;
    default:
      result = value;
  }
  return (
    <button className={`button ${className}`} id={value} onClick={() => onClick(value)}>
      {result}
    </button>
  );
};

export default Button;
