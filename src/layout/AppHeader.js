import PropTypes from "prop-types";
import styled from "styled-components";

import { HEADER } from "../constants/color";

export default function AppHeader({ children }) {
  return <Container>{children}</Container>;
}

AppHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  width: 100%;
  background: ${HEADER};
`;
