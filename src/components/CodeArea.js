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

  function saveContent(text, language) {
    handleChange((state) => {
      const currentContent = {
        content: text,
        prev: state[language],
        next: null,
      };

      state[language].next = currentContent;
      return {
        ...state,
        [language]: currentContent,
      };
    });
  }

  function onKeyUpListner(ev) {
    if (currentCode === code) return;
    if (
      ev.code === "Enter" ||
      ev.code === "Space" ||
      ev.code === "Backspace" ||
      ev.code === "Delete" ||
      ev.code === "Tab"
    ) {
      saveContentDebounce(currentCode, selectedLanguage, 0);
    }
  }

  const saveContentDebounce = useCallback(debounce(saveContent), []);
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={selectLanguageExtension(selectedLanguage)}
      onBlur={() => {
        if (currentCode === code) return;

        saveContentDebounce(currentCode, selectedLanguage, 0);
      }}
      onChange={(ev) => {
        setCurrentCode(ev);
        if (currentCode === code) return;

        saveContentDebounce(ev, selectedLanguage, 1000);
      }}
      onKeyUp={onKeyUpListner}
    />
  );
}

CodeArea.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func,
  selectedLanguage: PropTypes.string.isRequired,
};
