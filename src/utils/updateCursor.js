function updatePrevCursor(viewUpdate, doc, head, handlePrevCursor) {
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
    return handlePrevCursor(currentHead - (currentHead - prevEndHead));
  }

  return handlePrevCursor(currentHead - prevLineLength);
}

function updateNextCursor(viewUpdate, doc, head, handleNextCursor) {
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
  const nextCursor = viewportLines[lineNumber + 1]
    ? viewportLines[lineNumber + 1].from
    : null;

  if (nextLineLength === 0) {
    return handleNextCursor(nextCursor);
  }

  if (nextLineLength === null) {
    return handleNextCursor(currentHead);
  }

  return handleNextCursor(currentHead + currentLineLength);
}

export { updatePrevCursor, updateNextCursor };
