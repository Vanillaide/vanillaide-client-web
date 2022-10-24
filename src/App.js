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
    html: { content: "", prev: null, next: null },
    css: { content: "", prev: null, next: null },
    js: {
      content: "",
      prev: null,
      next: null,
    },
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
    setCode((prevState) => {
      const currentContent = {
        content: prevState[selectedLanguage].content + sign,
        prev: prevState[selectedLanguage],
        next: null,
      };
      prevState[selectedLanguage].next = currentContent;
      return { ...prevState, [selectedLanguage]: currentContent };
    });
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
              handleChange={setCode}
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
