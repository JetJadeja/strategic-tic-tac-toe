import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ReactApp from './App';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <ReactApp />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
