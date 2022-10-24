import PropTypes from "prop-types";
import styled from "styled-components";

export default function Layout({ height, children }) {
  return (
    <Container width={window.innerWidth} height={height}>
      {children}
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  height: PropTypes.number,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
