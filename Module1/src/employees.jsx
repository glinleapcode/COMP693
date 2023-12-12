let kay = "Kay Casey";
let ezra = "Ezra Dorsey";
let jeremy = "Jeremy Weaver";
let holly = "Holly Smith";
let jack = "Jack Bauer";

const element = (
  <ul style={{ color: "blue", fontSize: "24px" }}>
    <li>{kay}</li>
    <li>{ezra}</li>
    <li>{jeremy}</li>
    <li>{holly}</li>
    <li>{jack}</li>
  </ul>
);
ReactDOM.render(element, document.getElementById("root"));
