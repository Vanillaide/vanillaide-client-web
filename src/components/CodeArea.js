import PropTypes from "prop-types";
import styled from "styled-components";

import { DARK_BLUE_100 } from "../constants/color";

export default function CodeArea({ code }) {
  return <Container>{code}</Container>;
}

CodeArea.propTypes = {
  code: PropTypes.string,
};

const Container = styled.div`
  display: flex;
  flex: 14;
  background: ${DARK_BLUE_100};
  color: white;
`;
