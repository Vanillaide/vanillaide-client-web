import { useState } from "react";

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
  const [isRunCliked, setIsRunCliked] = useState(false);

  const selectedLanguageCode = code[selectedLanguage].content;

  const handleLanguageClick = (language) => {
    setIsRunCliked(false);
    setSelectedLanguage(language);
  };

  return (
    <Layout>
      <AppHeader>
        <MenuWrapper>
          <FontAwesomeIcon icon={faBars} className="function-icon" />
        </MenuWrapper>
        <FunctionHeader
          code={code}
          handleClick={setCode}
          selectedLanguage={selectedLanguage}
          handleRunClick={() => setIsRunCliked(true)}
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
          isRunCliked={isRunCliked}
        />
        <ToolBar
          handleChange={(str) =>
            setCode((prevState) => ({
              ...prevState,
              [selectedLanguage]: {
                content: prevState[selectedLanguage].content + str,
              },
            }))
          }
        />
      </ContentBox>
    </Layout>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;
