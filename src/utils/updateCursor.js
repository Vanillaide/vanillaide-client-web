function updatePrevCursor(viewUpdate, doc, head, setPrevCursor) {
  let initialCursor = 0;
  let lineNumber = 0;
  let prevEndHead = 0;
  const currentHead = head;

  while (
    doc.toString().indexOf("\n", initialCursor) < currentHead &&
    doc.toString().indexOf("\n", initialCursor) !== -1
  ) {
    initialCursor = doc.toString().indexOf("\n", initialCursor) + 1;
    lineNumber += 1;
    prevEndHead = doc.toString().indexOf("\n", initialCursor - 1);
  }

  if (lineNumber - 1 < 0) return;

  const { viewportLines } = viewUpdate.view.viewState;
  const prevLineLength = viewportLines[lineNumber - 1].length + 1;

  if (currentHead - prevLineLength < 0) return;

  if (currentHead - prevEndHead > prevLineLength) {
    return setPrevCursor(currentHead - (currentHead - prevEndHead));
  }

  return setPrevCursor(currentHead - prevLineLength);
}

function updateNextCursor(viewUpdate, doc, head, setNextCursor) {
  let initialCursor = 0;
  let lineNumber = 0;
  const currentHead = head;

  while (
    doc.toString().indexOf("\n", initialCursor) < currentHead &&
    doc.toString().indexOf("\n", initialCursor) !== -1
  ) {
    initialCursor = doc.toString().indexOf("\n", initialCursor) + 1;
    lineNumber += 1;
  }

  const { viewportLines } = viewUpdate.view.viewState;
  const currentLineLength = viewportLines[lineNumber].length + 1;
  const nextLineLength = viewportLines[lineNumber + 1]
    ? viewportLines[lineNumber + 1].length
    : null;

  if (!nextLineLength) {
    return setNextCursor(currentHead);
  }

  return setNextCursor(currentHead + currentLineLength);
}

export { updatePrevCursor, updateNextCursor };
