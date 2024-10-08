import React from 'react';
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import './App.css'
const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className='App'>
          <Header />
          <main className='content'>
            <Pages />
          </main>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
