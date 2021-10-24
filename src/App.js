import './App.css';
import LoginPage from './components/login/LoginPage';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './components/Context/AuthProvider';
import AppProvider from './components/Context/AppProvider';
import AddMembersModal from './components/Modal/AddMembersModal';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route component={LoginPage} path="/login"/>
              <Route component={ChatRoom} path="/"/>
            </Switch>
            <AddMembersModal/>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
} 

export default App;
