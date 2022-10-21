export default function LanguageBar() {
  const languagesArray = ["HTML", "CSS", "JS"];

  return (
    <div>
      {languagesArray.map((language) => {
        return (
          <div key={language}>
            <div>{language}</div>
          </div>
        );
      })}
    </div>
  );
}
