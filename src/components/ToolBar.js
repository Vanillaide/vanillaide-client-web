const signsArray = [
  "<",
  ">",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "`",
  JSON.stringify(""),
];

export default function ToolBar() {
  return (
    <div>
      {signsArray.map((sign) => {
        return (
          <div key={sign}>
            <p>{sign}</p>
          </div>
        );
      })}
      <div>
        <p>TAB</p>
      </div>
    </div>
  );
}
