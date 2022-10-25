import { render, screen, fireEvent } from "@testing-library/react";
import RedoButton from "../../components/FunctionHeader/RedoButton/RedoButton";

describe("<RedoButton />", () => {
  it("HandleClick should work when next node of selected language code exists", () => {
    const code = {
      html: {
        content: "html",
        prev: null,
        next: {
          html: { content: " next html", prev: null, next: null },
          css: { content: "next css", prev: null, next: null },
          js: { content: "next js", prev: null, next: null },
        },
      },
      css: { content: "css", prev: null, next: null },
      js: { content: "js", prev: null, next: null },
    };
    const selectedLanguage = "html";
    const handleClick = jest.fn();

    render(
      <RedoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />,
    );

    const redoButton = screen.getByTestId("redoButton");

    fireEvent.click(redoButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("HandleClick should not work when next node of selected language code doesn't exist", () => {
    const code = {
      html: { content: "html", prev: null, next: null },
      css: { content: "css", prev: null, next: null },
      js: { content: "js", prev: null, next: null },
    };
    const selectedLanguage = "html";
    const handleClick = jest.fn();

    render(
      <RedoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />,
    );

    const redoButton = screen.getByTestId("redoButton");

    fireEvent.click(redoButton);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
