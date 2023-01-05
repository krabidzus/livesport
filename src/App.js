import "./App.css";
import React, { useState } from 'react';
import Search from "./pages/Search.tsx";
import Detail from "./pages/Detail.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
