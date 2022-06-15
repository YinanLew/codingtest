import React from "react";

import "./components/style.css";
import {useRoutes} from "react-router-dom";
import routes from "./components/router";

function App() {

    const element = useRoutes(routes);

  return (
    <div className="App">
        {element}
    </div>
  );
}

export default App;
