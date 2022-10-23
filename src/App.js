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
    html: { content: "<h1>This is h1 element</h1>", prev: null, next: null },
    css: { content: "h1 {\n color: red;\n}", prev: null, next: null },
    js: {
      content:
        'document.querySelector("h1").addEventListener("click", function () {\n  alert("clicked h1 element");\n});',
      prev: null,
      next: null,
    },
  });
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedLanguageCode = code[selectedLanguage].content;

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

  useEffect(() => {
    document.addEventListener("message", handleOnMessage);

    return () => {
      document.removeEventListener("message", handleOnMessage);
    };
  }, []);

  return (
    <>
      {isLoaded && (
        <Layout>
          <AppHeader>
            <MenuWrapper>
              <FontAwesomeIcon icon={faBars} className="function-icon" />
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
