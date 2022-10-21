import PropTypes from "prop-types";
import styled from "styled-components";

export default function ContentBox({ children }) {
  return <Container>{children}</Container>;
}

ContentBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const Container = styled.div``;
