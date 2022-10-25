import { render, screen, fireEvent } from "@testing-library/react";
import LanguageBar from "../../components/LanguageBar";

describe("<LanguageBar />", () => {
  it("LanguageBar component should show correct color when target bar language is same with selectedLanguage", () => {
    const selectedLanguage = "css";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    const cssBar = screen.getByText("CSS");
    expect(cssBar).toHaveStyle("background: #D9D9D9");
  });

  it("LanguageBar component should show correct color when target bar language is different with selectedLanguage", () => {
    const selectedLanguage = "html";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    const cssBar = screen.getByText("CSS");
    expect(cssBar).toHaveStyle("background: #313842");
  });

  it("HandlePress should work when target language bar is clicked", () => {
    const selectedLanguage = "html";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    const cssBar = screen.getByText("CSS");

    fireEvent.click(cssBar);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
