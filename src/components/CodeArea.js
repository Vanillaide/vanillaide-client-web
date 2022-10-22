import PropTypes from "prop-types";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { useCallback, useState } from "react";
import debounce from "../utils/debounce";

function selectLanguageExtension(string) {
  if (string === "html") return [html()];
  if (string === "css") return [css()];
  if (string === "js") return [javascript({ jsx: true })];
}

export default function CodeArea({ code, handleChange, selectedLanguage }) {
  const [currentCode, setCurrentCode] = useState(code);

  const saveContent = (text, prevText, language) => {
    if (text === prevText) return;

    handleChange((prevState) => {
      const currentContent = {
        content: text,
        prev: prevState[language],
        next: null,
      };

      prevState[language].next = currentContent;
      return {
        ...prevState,
        [language]: currentContent,
      };
    });
  };

  const handleKeyUp = (ev) => {
    if (ev.code === "Enter" || ev.code === "Space" || ev.code === "Tab") {
      saveContentDebounce(currentCode, code, selectedLanguage, 0);
    }
  };

  const handleBlur = () => {
    saveContentDebounce(currentCode, code, selectedLanguage, 0);
  };

  const handleCodeMirrorChange = (value) => {
    setCurrentCode(value);
    saveContentDebounce(value, code, selectedLanguage, 1000);
  };

  const saveContentDebounce = useCallback(debounce(saveContent), []);
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={selectLanguageExtension(selectedLanguage)}
      onBlur={handleBlur}
      onChange={handleCodeMirrorChange}
      onKeyUp={handleKeyUp}
    />
  );
}

CodeArea.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func,
  selectedLanguage: PropTypes.string.isRequired,
};
