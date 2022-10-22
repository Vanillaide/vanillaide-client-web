import { useState, useCallback } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { atomone } from "@uiw/codemirror-theme-atomone";

import debounce from "../utils/debounce";
import integrateCode from "../utils/integrateCode";

import { DARK_BLUE_100 } from "../constants/color";

function selectLanguageExtension(string) {
  if (string === "html") return [html()];
  if (string === "css") return [css()];
  if (string === "js") return [javascript({ jsx: true })];
}

export default function CodeArea({
  code,
  wholeCode,
  handleChange,
  selectedLanguage,
  isRunCliked,
}) {
  const [currentCode, setCurrentCode] = useState(code);
  const {
    html: { content: htmlCode },
    css: { content: cssCode },
    js: { content: jsCode },
  } = wholeCode;

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
    <Container>
      {isRunCliked ? (
        <ResultViewer srcDoc={integrateCode(htmlCode, cssCode, jsCode)} />
      ) : (
        <CodeMirror
          value={code}
          theme={atomone}
          extensions={selectLanguageExtension(selectedLanguage)}
          onBlur={handleBlur}
          onChange={handleCodeMirrorChange}
          onKeyUp={handleKeyUp}
          className="editor"
        />
      )}
    </Container>
  );
}

CodeArea.propTypes = {
  code: PropTypes.string,
  wholeCode: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  selectedLanguage: PropTypes.string.isRequired,
  isRunCliked: PropTypes.bool.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 14;
  width: 100%;
  height: 100%;

  .editor {
    width: 100%;
    height: 100%;
  }
`;

const ResultViewer = styled.iframe`
  width: 100%;
  height: 100%;
  background: ${DARK_BLUE_100};
  border: none;
  outline: none;
`;
