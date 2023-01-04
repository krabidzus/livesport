import "./App.css";
import Search from "../src/pages/Search";
import Detail from "../src/pages/Detail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';

function App() {
  const [detail, setDetail] = useState({});

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Search setDetail={setDetail} />} />
        <Route exact path="/detail" element={<Detail detail={detail} />} />
      </Routes>
    </Router>
  );
}

export default App;
