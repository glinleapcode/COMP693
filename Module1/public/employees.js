let kay = "Kay Casey";
let ezra = "Ezra Dorsey";
let jeremy = "Jeremy Weaver";
let holly = "Holly Smith";
let jack = "Jack Bauer";
const element = /*#__PURE__*/React.createElement("ul", {
  style: {
    color: "blue",
    fontSize: "24px"
  }
}, /*#__PURE__*/React.createElement("li", null, kay), /*#__PURE__*/React.createElement("li", null, ezra), /*#__PURE__*/React.createElement("li", null, jeremy), /*#__PURE__*/React.createElement("li", null, holly), /*#__PURE__*/React.createElement("li", null, jack));
ReactDOM.render(element, document.getElementById("root"));