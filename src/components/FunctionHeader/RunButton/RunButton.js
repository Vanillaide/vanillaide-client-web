import PropTypes from "prop-types";
import "./RunButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function RunButton({ code }) {
  return <FontAwesomeIcon icon={faPlay} className="play" />;
}

RunButton.propTypes = {
  code: PropTypes.object.isRequired,
};
