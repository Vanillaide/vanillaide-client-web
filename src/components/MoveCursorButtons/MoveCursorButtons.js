import PropTypes from "prop-types";
import styled from "styled-components";

import { LIGHT_GREY_50 } from "../../constants/color";

import MoveUpButton from "./MoveUpButton/MoveUpButton";
import MoveDownButton from "./MoveDownButton/MoveDownButton";
import MoveLeftButton from "./MoveLeftButton/MoveLeftButton";
import MoveRightButton from "./MoveRightButton/MoveRightButton";

export default function MoveCursorButtons({
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

MoveCursorButtons.propTypes = {
  handleMoveUp: PropTypes.func.isRequired,
  handleMoveDown: PropTypes.func.isRequired,
  handleMoveLeft: PropTypes.func.isRequired,
  handleMoveRight: PropTypes.func.isRequired,
};

const Container = styled.div`
  min-height: 100%;

  .cursor-icon {
    position: absolute;
    font-size: 35px;
    color: ${LIGHT_GREY_50};
  }

  .up {
    top: 70%;
    left: 78vw;
  }

  .down {
    top: 80%;
    left: 78vw;
  }

  .left {
    top: 75%;
    left: 66vw;
  }

  .right {
    top: 75%;
    left: 89vw;
  }
`;
