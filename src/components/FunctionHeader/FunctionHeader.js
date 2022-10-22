import PropTypes from "prop-types";
import styled from "styled-components";

import RedoButton from "./RedoButton/RedoButton";
import RunButton from "./RunButton/RunButton";
import SaveButton from "./SaveButton/SaveButton";
import UndoButton from "./UndoButton/UndoButton";

export default function FunctionHeader({
  code,
  handleClick,
  selectedLanguage,
  handleRunClick,
}) {
  return (
    <Container>
      <RunButton code={code} handleClick={handleRunClick} />
      <UndoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />
      <RedoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />
      <SaveButton code={code} />
    </Container>
  );
}

FunctionHeader.propTypes = {
  code: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  handleRunClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-around;
  align-items: center;
`;
