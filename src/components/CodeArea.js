import PropTypes from "prop-types";
import styled from "styled-components";

export default function CodeArea({ code }) {
  return <Container>{code}</Container>;
}

CodeArea.propTypes = {
  code: PropTypes.string,
};

const Container = styled.div`
  display: flex;
  flex: 14;
  background: #262c35;
  color: white;
`;
