import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function SaveButton({ code }) {
  return <FontAwesomeIcon icon={faFloppyDisk} className="function-icon" />;
}

SaveButton.propTypes = {
  code: PropTypes.object.isRequired,
};
