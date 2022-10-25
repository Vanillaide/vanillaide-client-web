import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function UndoButton({ code, handleClick, selectedLanguage }) {
  const handleUndoClick = () => {
    if (!code[selectedLanguage].prev) return;
    handleClick((prevState) => {
      return {
        ...prevState,
        [selectedLanguage]: prevState[selectedLanguage].prev,
      };
    });
  };

  return (
    <FontAwesomeIcon
      icon={faRotateLeft}
      className="function-icon"
      onClick={handleUndoClick}
      data-testid="undoButton"
    />
  );
}

UndoButton.propTypes = {
  code: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};
