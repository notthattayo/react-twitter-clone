import React, {Component} from 'react';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './App.css';
import {UserProvider } from './context/UserContext';
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile';
import UnderConstruct from './pages/under-construction/UnderConstruction';
import ProtectedRoute from './auth/ProtectedRoute'
import RedirectRoute from './auth/RedirectRoute'


class App extends Component {
  render() {
      return (
        <div className= "App">
           <UserProvider>
              <Router>
                  <div>
                      <Switch>
                            <RedirectRoute exact path = '/' component={Login}/>
                            <ProtectedRoute path='/home' component={Home}/>
                            <Route path='/profile' component={Profile}/>
                            <Route component={UnderConstruct}></Route>
                      </Switch>
                  </div>
              </Router>
          </UserProvider>
        </div>
      );
   }
}

export default App;
