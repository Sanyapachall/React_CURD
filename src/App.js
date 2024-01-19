// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./MainComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
