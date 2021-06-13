import './App.css';
import React from 'react';
//import Mycontract from '../abis/Mycontract.json'
import Main from './Components/Main';
import Login from './Login/Login';
import Login1 from './Login/Login1';
import Client_Home from './Components/Client_Pages/Client_Home'
import Sp_Home from './Components/Sp_Pages/Sp_Home'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';


class App extends React.Component{

  render()
  {
    return(

      <div>
      
    <Router>
      <Switch>

              <Route exact path = "/" ><Main /></Route>
              <Route path="/Login"><Login /></Route>
              <Route path="/Login1"><Login1 /></Route>
              <Route path="/Client_Home"><Client_Home /></Route>
              <Route path="/Sp_Home"><Sp_Home /></Route>
      </Switch>
    </Router>

  </div>

    );
  }
}

export default App;
 