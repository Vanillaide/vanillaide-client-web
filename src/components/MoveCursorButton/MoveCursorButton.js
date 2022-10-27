import PropTypes from "prop-types";
import styled from "styled-components";

import { LIGHT_GREY_50 } from "../../constants/color";

import MoveUpButton from "./MoveUpButton/MoveUpButton";
import MoveDownButton from "./MoveDownButton/MoveDownButton";
import MoveLeftButton from "./MoveLeftButton/MoveLeftButton";
import MoveRightButton from "./MoveRightButton/MoveRightButton";

export default function MoveCursorButton({
  handleMoveUp,
  handleMoveDown,
  handleMoveLeft,
  handleMoveRight,
}) {
  return (
    <Container>
      <MoveUpButton handleClick={handleMoveUp} />
      <MoveDownButton handleClick={handleMoveDown} />
      <MoveLeftButton handleClick={handleMoveLeft} />
      <MoveRightButton handleClick={handleMoveRight} />
    </Container>
  );
}

MoveCursorButton.propTypes = {
  handleMoveUp: PropTypes.func.isRequired,
  handleMoveDown: PropTypes.func.isRequired,
  handleMoveLeft: PropTypes.func.isRequired,
  handleMoveRight: PropTypes.func.isRequired,
};

const Container = styled.div`
  position: fixed;
  height: 100%;
  z-index: 1;

  .cursor-icon {
    position: absolute;
    font-size: 20px;
    color: ${LIGHT_GREY_50};
  }

  .up {
    top: 75%;
    left: 86vw;
  }

  .down {
    top: 81%;
    left: 86vw;
  }

  .left {
    top: 78%;
    left: 80vw;
  }

  .right {
    top: 78%;
    left: 92vw;
  }
`;
