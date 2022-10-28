import * as React from 'react'
import './App.css'
import RegisterPage from './pages/register-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContext from './context/main-context';
import LoginPage from './pages/login-page';
import PlayersPage from './pages/players-page';
import SessionPage from './pages/session-page';

function App() {
  const [players, setPlayers] = React.useState([])
  const [opponent, setOpponent] = React.useState([])
  const [loggedInPlayer, setLoggedInPlayer] = React.useState({})

  return (
  <MainContext.Provider value={{players, setPlayers, opponent, setOpponent, loggedInPlayer, setLoggedInPlayer}}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<PlayersPage />} />
          <Route path="/game" element={<SessionPage opponent={opponent} />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
