import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function RedoButton({ code }) {
  console.log(code);

  return <FontAwesomeIcon icon={faRotateRight} className="function-icon" />;
}

RedoButton.propTypes = {
  code: PropTypes.string.isRequired,
};
