import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function UndoButton({ code, handleClick, selectedLanguage }) {
  const handleUndoClick = () => {
    if (!code[selectedLanguage].prev) return;
    handleClick((state) => {
      return { ...state, [selectedLanguage]: state[selectedLanguage].prev };
    });
  };
  return (
    <FontAwesomeIcon
      icon={faRotateLeft}
      className="function-icon"
      onClick={handleUndoClick}
    />
  );
}

UndoButton.propTypes = {
  code: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};
