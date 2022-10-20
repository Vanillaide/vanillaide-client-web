import PropTypes from "prop-types";
import styled from "styled-components";

export default function AppHeader({ children }) {
  return <Container>{children}</Container>;
}

AppHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const Container = styled.div``;
