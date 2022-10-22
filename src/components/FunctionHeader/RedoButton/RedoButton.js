import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function RedoButton({ code, handleClick, selectedLanguage }) {
  const handleRedoClick = () => {
    if (!code[selectedLanguage].next) return;
    handleClick((state) => {
      return { ...state, [selectedLanguage]: state[selectedLanguage].next };
    });
  };

  return (
    <FontAwesomeIcon
      icon={faRotateRight}
      className="function-icon"
      onClick={handleRedoClick}
    />
  );
}

RedoButton.propTypes = {
  code: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};
