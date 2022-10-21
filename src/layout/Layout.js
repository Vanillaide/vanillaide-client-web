import PropTypes from "prop-types";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <Container width={window.innerWidth} height={window.innerHeight}>
      {children}
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
