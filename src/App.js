import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import AppHeader from "./layout/AppHeader";
import Layout from "./layout/Layout";
import ContentBox from "./layout/ContentBox";

import LanguageBar from "./components/LanguageBar";
import CodeArea from "./components/CodeArea";
import FunctionHeader from "./components/FunctionHeader/FunctionHeader";
import ToolBar from "./components/ToolBar";
import MoveCursorButtons from "./components/MoveCursorButtons/MoveCursorButtons";

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [code, setCode] = useState({
    html: { content: "", prev: null, next: null },
    css: { content: "", prev: null, next: null },
    js: {
      content: "",
      prev: null,
      next: null,
    },
  });
  const [view, setView] = useState({
    html: null,
    css: null,
    js: null,
  });
  const [selection, setSelction] = useState({
    html: null,
    css: null,
    js: null,
  });

  const [isRunClicked, setIsRunClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [prevCursor, setPrevCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const selectedLanguageCode = code[selectedLanguage].content;

  const handleMenuClick = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ method: "showMenu" }),
    );
  };

  const handleLanguageClick = (language) => {
    setIsRunClicked(false);
    setSelectedLanguage(language);
  };

  const handleSignClick = (sign) => {
    const { anchor, head } = selection[selectedLanguage];
    const currentView = view[selectedLanguage];
    const from = anchor <= head ? anchor : head;
    const to = anchor <= head ? head : anchor;
    const changes = [
      {
        from,
        to,
        insert: sign,
      },
    ];
    const nextAnchor = anchor <= head ? anchor : head;

    currentView.dispatch({ changes, selection: { anchor: nextAnchor + 1 } });
    currentView.focus();
  };

  const handleOnMessage = (ev) => {
    const loadedCode = JSON.parse(ev.data);

    setCode({
      html: { content: loadedCode["html"], prev: null, next: null },
      css: { content: loadedCode["css"], prev: null, next: null },
      js: { content: loadedCode["js"], prev: null, next: null },
    });

    setIsLoaded(true);
  };

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  const handleMoveUpClick = () => {
    if (prevCursor < 0) return;

    view[selectedLanguage].dispatch({
      selection: {
        head: prevCursor,
        anchor: prevCursor,
      },
    });

    view[selectedLanguage].focus();
  };

  const handleMoveDownClick = () => {
    if (nextCursor < 0) return;

    view[selectedLanguage].dispatch({
      selection: {
        head: nextCursor,
        anchor: nextCursor,
      },
    });

    view[selectedLanguage].focus();
  };

  const handleMoveLeftClick = () => {
    const { head } = view[selectedLanguage].state.selection.ranges[0];
    const targetHead = head - 1 < 0 ? head : head - 1;

    view[selectedLanguage].dispatch({
      selection: {
        head: targetHead,
        anchor: targetHead,
      },
    });

    view[selectedLanguage].focus();
  };

  const handleMoveRightClick = () => {
    const { head } = view[selectedLanguage].state.selection.ranges[0];
    const { doc } = view[selectedLanguage].state;
    const targetHead = head + 1 > doc.toString().length ? head : head + 1;

    view[selectedLanguage].dispatch({
      selection: {
        head: targetHead,
        anchor: targetHead,
      },
    });

    view[selectedLanguage].focus();
  };

  useEffect(() => {
    document.addEventListener("message", handleOnMessage);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("message", handleOnMessage);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLoaded && (
        <Layout innerHeight={innerHeight}>
          <AppHeader>
            <MenuWrapper>
              <FontAwesomeIcon
                icon={faBars}
                className="function-icon"
                onClick={handleMenuClick}
              />
            </MenuWrapper>
            <FunctionHeader
              code={code}
              handleClick={setCode}
              selectedLanguage={selectedLanguage}
              handleRunClick={() => setIsRunClicked(true)}
            />
          </AppHeader>
          <ContentBox>
            <LanguageBar
              selectedLanguage={selectedLanguage}
              handlePress={handleLanguageClick}
            />
            <CodeArea
              code={selectedLanguageCode}
              wholeCode={code}
              selection={selection}
              handleChange={setCode}
              handleUpdate={setSelction}
              handleCreateEditor={setView}
              selectedLanguage={selectedLanguage}
              isRunClicked={isRunClicked}
              innerHeight={innerHeight}
              handlePrevCursor={setPrevCursor}
              handleNextCursor={setNextCursor}
            />
            <ToolBar handleClick={handleSignClick} />
            <ButtonWrapper>
              <MoveCursorButtons
                handleMoveUpClick={handleMoveUpClick}
                handleMoveDownClick={handleMoveDownClick}
                handleMoveLeftClick={handleMoveLeftClick}
                handleMoveRightClick={handleMoveRightClick}
              />
            </ButtonWrapper>
          </ContentBox>
        </Layout>
      )}
    </>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  z-index: 1;
  height: 100vh;
  margin: -20px;
`;
