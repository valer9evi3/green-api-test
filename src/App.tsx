import React from 'react';
import { useSelector } from 'react-redux';
import { Login } from './components/Login';
import { Chat } from './components/Chat';
import { RootState } from './store';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="h-screen">
      {!isAuthenticated ? <Login /> : <Chat />}
    </div>
  );
}

export default App