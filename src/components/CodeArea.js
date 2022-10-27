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

import { updatePrevCursor, updateNextCursor } from "../utils/updateCursor";
import { WHITE, DARK_BLUE_150 } from "../constants/color";

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
  isRunClicked,
  innerHeight,
}) {
  const [currentCode, setCurrentCode] = useState(code);
  const {
    html: { content: htmlCode },
    css: { content: cssCode },
    js: { content: jsCode },
  } = wholeCode;

  const [prevCursor, setPrevCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const [savedView, setSavedView] = useState({});

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

  const handleUpdate = (viewUpdate) => {
    const { head } = viewUpdate.state.selection.ranges[0];
    const { doc } = viewUpdate.state;

    updatePrevCursor(viewUpdate, doc, head, setPrevCursor);
    updateNextCursor(viewUpdate, doc, head, setNextCursor);
  };

  const handleMoveUp = () => {
    if (prevCursor < 0) return;

    savedView.dispatch({
      selection: {
        head: prevCursor,
        anchor: prevCursor,
      },
    });

    savedView.focus();
  };

  const handleMoveDown = () => {
    if (nextCursor < 0) return;

    savedView.dispatch({
      selection: {
        head: nextCursor,
        anchor: nextCursor,
      },
    });

    savedView.focus();
  };

  const handleMoveLeft = () => {
    const { head } = savedView.state.selection.ranges[0];
    const currentHead = head;
    let movedLeft = currentHead - 1;

    if (movedLeft < 0) {
      movedLeft = currentHead;
    }

    savedView.dispatch({
      selection: {
        head: movedLeft,
        anchor: movedLeft,
      },
    });

    savedView.focus();
  };

  const handleMoveRight = () => {
    const { head } = savedView.state.selection.ranges[0];
    const currentHead = head;
    let movedRight = currentHead + 1;

    const { doc } = savedView.state;

    if (movedRight > doc.toString().length) {
      movedRight = currentHead;
    }

    savedView.dispatch({
      selection: {
        head: movedRight,
        anchor: movedRight,
      },
    });

    savedView.focus();
  };

  const saveContentDebounce = useCallback(debounce(saveContent), []);

  const handleCreateEditor = (view) => {
    setSavedView(view);
  };

  return (
    <Container>
      {isRunClicked ? (
        <ResultViewer srcDoc={integrateCode(htmlCode, cssCode, jsCode)} />
      ) : (
        <>
          <CodeMirror
            value={code}
            theme={atomone}
            height={`${(innerHeight * 77) / 96}px`}
            extensions={selectLanguageExtension(selectedLanguage)}
            onBlur={handleBlur}
            onChange={handleCodeMirrorChange}
            onKeyUp={handleKeyUp}
            className="editor"
            onUpdate={handleUpdate}
            onCreateEditor={handleCreateEditor}
          />
          <button onClick={handleMoveUp}>moveUp</button>
          <button onClick={handleMoveDown}>moveDown</button>
          <button onClick={handleMoveLeft}>Left</button>
          <button onClick={handleMoveRight}>Right</button>
        </>
      )}
    </Container>
  );
}

CodeArea.propTypes = {
  code: PropTypes.string,
  wholeCode: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  selectedLanguage: PropTypes.string.isRequired,
  isRunClicked: PropTypes.bool.isRequired,
  innerHeight: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 14;
  width: 100%;
  height: 100%;
  background: ${DARK_BLUE_150};
  overflow: scroll;

  .editor {
    width: 100%;
    height: 100%;
    outline: none;
  }
`;

const ResultViewer = styled.iframe`
  width: 100%;
  height: 100%;
  background: ${WHITE};
  border: none;
  outline: none;
`;
