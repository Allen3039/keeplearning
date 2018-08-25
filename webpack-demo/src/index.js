import "../styles/images.css";
import sum from "./sum";
import jpg1 from "fq/1.jpeg";
// import jpg1 from "../images/1.jpeg";
import jpgDva from "../images/dva.jpeg";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Link, HashRouter as Router, Route } from "react-router-dom";
import Loadable from "react-loadable";

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    console.log(error);
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
const LoadableFKU = Loadable({
  loader: () => import(`./fku.js`),
  loading: MyLoadingComponent
});

let jpgElement = document.createElement("img");
jpgElement.src = jpg1;
document.body.appendChild(jpgElement);

let jpgElement2 = document.createElement("img");
jpgElement2.src = jpgDva;
document.body.appendChild(jpgElement2);
console.log(sum(1, 2));

class NIMA extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">/</Link>
            </li>
            <li>
              <Link to="/about">/about</Link>
            </li>
            <li>
              <Link to="/fku">/fku</Link>
            </li>
          </ul>
          <div>nima</div>
          <Route exact path="/" component={() => "home"} />
          <Route exact path="/about" component={() => "about"} />
          <Route exact path="/fku" component={LoadableFKU} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<NIMA />, document.getElementById("id"));
