import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js"
import webFont from "webfontloader"
import React from "react";
import Home from "./components/Home/Home.js"

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
    <Routes>
      <Route exact path="/" Component={Home} />
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
