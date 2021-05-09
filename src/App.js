import React from 'react';
import './App.css';
import 'firebase/firestore';
import 'firebase/auth';
import {Login,auth} from './Components/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './Components/Sidebar/Sidebar'
import Chat from './Components/Chats/Chat'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


function App() {

  const [user] = useAuthState(auth); 
  return (
    <div className="App">
       {!user ?(
        <Login />
      ): (
        <Router>
          <Sidebar />
          <Switch>
            <Route path='/groups/:grpId'>
              <Chat user={user.displayName} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}



export default App;