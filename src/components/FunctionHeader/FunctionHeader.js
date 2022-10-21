import PropTypes from "prop-types";
import styled from "styled-components";

import RedoButton from "./RedoButton/RedoButton";
import RunButton from "./RunButton/RunButton";
import SaveButton from "./SaveButton/SaveButton";
import UndoButton from "./UndoButton/UndoButton";

export default function FunctionHeader({ code, selectedLanguageCode }) {
  return (
    <Container>
      <RunButton code={code} />
      <UndoButton code={selectedLanguageCode} />
      <RedoButton code={selectedLanguageCode} />
      <SaveButton code={code} />
    </Container>
  );
}

FunctionHeader.propTypes = {
  code: PropTypes.object.isRequired,
  selectedLanguageCode: PropTypes.string,
};

const Container = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-around;
  align-items: center;
`;
