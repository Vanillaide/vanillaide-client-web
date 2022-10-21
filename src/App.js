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

import "./App.css";

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [code, setCode] = useState({ html: "", css: "", js: "" });

  const selectedLanguageCode = code[selectedLanguage];

  return (
    <Layout>
      <AppHeader>
        <MenuWrapper>
          <FontAwesomeIcon icon={faBars} className="menuBar" />
        </MenuWrapper>
        <FunctionHeader
          code={code}
          selectedLanguageCode={selectedLanguageCode}
        />
      </AppHeader>
      <ContentBox>
        <LanguageBar
          selectedLanguage={selectedLanguage}
          handlePress={(language) => setSelectedLanguage(language)}
        />
        <CodeArea code={selectedLanguageCode} />
        <ToolBar
          handleChange={(str) =>
            setCode((prev) => ({
              ...prev,
              [selectedLanguage]: prev[selectedLanguage] + str,
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
