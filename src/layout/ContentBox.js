import PropTypes from "prop-types";
import styled from "styled-components";

export default function ContentBox({ children }) {
  return <Container>{children}</Container>;
}

ContentBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 11;
  width: 100%;

  .cm-theme {
    height: 500px;
    background: #272c35;
    overflow: scroll;
  }

  .ͼ1.cm-editor.cm-focused {
    outline: 0px;
  }
`;
