import PropTypes from "prop-types";
import "./SaveButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function SaveButton({ code }) {
  console.log(code);

  return <FontAwesomeIcon icon={faFloppyDisk} className="save" />;
}

SaveButton.propTypes = {
  code: PropTypes.object.isRequired,
};
