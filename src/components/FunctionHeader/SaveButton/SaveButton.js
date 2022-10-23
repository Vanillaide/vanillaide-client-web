import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import sanitizeCode from "../../../utils/sanitizeCode";

export default function SaveButton({ code }) {
  const {
    html: { content: htmlCode },
    css: { content: cssCode },
    js: { content: jsCode },
  } = code;

  const handleClick = (ev) => {
    ev.preventDefault();
    const contentOfCode = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
    };

    const sanitizedCode = sanitizeCode(contentOfCode);

    window.ReactNativeWebView.postMessage(
      JSON.stringify({ method: "save", code: sanitizedCode }),
    );
  };

  return (
    <FontAwesomeIcon
      icon={faFloppyDisk}
      className="function-icon"
      onClick={handleClick}
    />
  );
}

SaveButton.propTypes = {
  code: PropTypes.object.isRequired,
};
