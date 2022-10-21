import PropTypes from "prop-types";
import styled from "styled-components";

export default function LanguageBar({ selectedLanguage, handlePress }) {
  const languagesArray = ["HTML", "CSS", "JS"];

  return (
    <Container>
      {languagesArray.map((language) => {
        return (
          <LanguageWrapper
            key={language}
            onClick={() => handlePress(language.toLowerCase())}
            backgroundColor={
              selectedLanguage === language.toLowerCase()
                ? "#D9D9D9"
                : "#313842"
            }
          >
            {language}
          </LanguageWrapper>
        );
      })}
    </Container>
  );
}

LanguageBar.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  background: #313842;
`;

const LanguageWrapper = styled.div`
  display: flex;
  margin: 1px;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px;
  font-size: 20px;
`;

// const LanguageBox = styled.div`
//   width: 100%;
//   background: ${({ backgroundColor }) => backgroundColor};
//   border-radius: 10px;
// `;
