import PropTypes from "prop-types";
import "./UndoButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function UndoButton({ code }) {
  return <FontAwesomeIcon icon={faRotateLeft} className="undo" />;
}

UndoButton.propTypes = {
  code: PropTypes.string.isRequired,
};
