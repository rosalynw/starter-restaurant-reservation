import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import './App.css'
import backgroundImage from './images/damir-samatkulov-AmnS6Lx0324-unsplash2.jpg'


/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
   const backgroundStyle = {
     backgroundImage: `url(${backgroundImage})`,
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    display: 'flex'
   };
  
  return (
    <div className="app" style={backgroundStyle}>
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
