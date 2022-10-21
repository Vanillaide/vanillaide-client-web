import RedoButton from "./RedoButton";
import RunButton from "./RunButton";
import SaveButton from "./SaveButton";
import UndoButton from "./UndoButton";

export default function FunctionHeader() {
  return (
    <div>
      <RunButton />
      <UndoButton />
      <RedoButton />
      <SaveButton />
    </div>
  );
}
