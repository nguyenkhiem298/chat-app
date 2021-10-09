import './App.css';
import LoginPage from './components/login/LoginPage';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './components/Context/AuthProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route component={LoginPage} path="/login"/>
            <Route component={ChatRoom} path="/"/>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
} 

export default App;
