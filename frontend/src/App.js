import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js"
import webFont from "webfontloader"
import React from "react";

function App() {

  React.useEffect(() => {
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },
    });
  },[]);

  return(
  <Router>
    <Header />
    <Footer />
  </Router>
  );
}

export default App;
