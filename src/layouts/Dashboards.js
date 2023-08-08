import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockRow from '../components/StockRow';
import List from '../pages/List';
import StockPage from '../pages/StockPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfoy from '../pages/Portfoy';
import AddStock from '../pages/AddStock';

export default function Dashboards() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/" element={<List />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/portfoy" element={<Portfoy />} />
          <Route exact path="/addstock" element={<AddStock />} />
          <Route exact path="/:id" element={<StockPage />} />
         
        </Routes>
      </Router>
    </div>
  );
}
