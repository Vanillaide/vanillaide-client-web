import PropTypes from "prop-types";
import styled from "styled-components";

const signsArray = [
  "<",
  ">",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "`",
  JSON.stringify(""),
];

export default function ToolBar({ handleChange }) {
  return (
    <Container>
      {signsArray.map((sign) => {
        return (
          <SignWrapper key={sign} onClick={() => handleChange(sign)}>
            {sign}
          </SignWrapper>
        );
      })}
      <SignWrapper onClick={() => handleChange("  ")}>TAB</SignWrapper>
    </Container>
  );
}

ToolBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background: #1d2229;
`;

const SignWrapper = styled.div`
  color: #d9d9d9;
`;
