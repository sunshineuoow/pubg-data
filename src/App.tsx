import React from 'react';
import './App.scss';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from './pages/home';
import MatchPage from './pages/match';
import UserPage from './pages/user';
import MatchDetailPage from './pages/mathDetail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Route path="/" exact component={HomePage} />
      <Route path="/match" exact component={MatchPage} />
      <Route path="/user" component={UserPage} />
      <Route path="/match/:platform/:id" exact component={MatchDetailPage} />
    </HashRouter>
  );
};

export default App;
