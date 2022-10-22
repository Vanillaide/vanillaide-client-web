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
    html: { content: "html", prev: null, next: null },
    css: { content: "h1 {\n color: red;\n}", prev: null, next: null },
    js: { content: "js", prev: null, next: null },
  });

  const selectedLanguageCode = code[selectedLanguage].content;

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
        />
      </AppHeader>
      <ContentBox>
        <LanguageBar
          selectedLanguage={selectedLanguage}
          handlePress={(language) => setSelectedLanguage(language)}
        />
        <CodeArea
          code={selectedLanguageCode}
          handleChange={setCode}
          selectedLanguage={selectedLanguage}
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
