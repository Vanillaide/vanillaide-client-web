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

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [code, setCode] = useState({
    html: { content: "", anchor: 0, head: 0, prev: null, next: null },
    css: { content: "", anchor: 0, head: 0, prev: null, next: null },
    js: { content: "", anchor: 0, head: 0, prev: null, next: null },
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

    // setCode((prevState) => {
    //   prevState[selectedLanguage].anchor = from;
    //   prevState[selectedLanguage].head = from;
    //   return prevState;
    // });

    currentView.focus();
  };

  const handleOnMessage = (ev) => {
    const loadedCode = JSON.parse(ev.data);

    setCode({
      html: {
        content: loadedCode["html"],
        anchor: 0,
        head: 0,
        prev: null,
        next: null,
      },
      css: {
        content: loadedCode["css"],
        anchor: 0,
        head: 0,
        prev: null,
        next: null,
      },
      js: {
        content: loadedCode["js"],
        anchor: 0,
        head: 0,
        prev: null,
        next: null,
      },
    });

    setIsLoaded(true);
  };

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    document.addEventListener("message", handleOnMessage);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("message", handleOnMessage);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (view[selectedLanguage]) {
      view[selectedLanguage].dispatch({
        selection: selection[selectedLanguage],
      });
      view[selectedLanguage].focus();
    }
  }, [code]);

  return (
    <>
      {!isLoaded && (
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
              handleUndoRedoClick={setSelction}
              view={view[selectedLanguage]}
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
            />
            <ToolBar handleClick={handleSignClick} />
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
