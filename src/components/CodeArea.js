import PropTypes from "prop-types";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { atomone } from "@uiw/codemirror-theme-atomone";

function selectLanguageExtension(string) {
  if (string === "html") return [html()];
  if (string === "css") return [css()];
  if (string === "js") return [javascript({ jsx: true })];
}

export default function CodeArea({ code, handleChange, selectedLanguage }) {
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={selectLanguageExtension(selectedLanguage)}
      onChange={(value) => {
        handleChange((state) => {
          return {
            ...state,
            [selectedLanguage]: { ...state[selectedLanguage], content: value },
          };
        });
      }}
    />
  );
}

CodeArea.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func,
  selectedLanguage: PropTypes.string.isRequired,
};
