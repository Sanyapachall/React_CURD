// App.js
import React from "react";
import Form from "./Form";
import DataTable from "./DataTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/datatable" element={<DataTable />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
