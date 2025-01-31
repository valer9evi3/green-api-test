import { useSelector } from 'react-redux';
import { RootState } from './types';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div className='h-screen'>{!isAuthenticated ? <Login /> : <Chat />}</div>
  );
}

export default App;
