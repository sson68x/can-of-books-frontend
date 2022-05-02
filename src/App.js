import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Devprofile from './About';
import { withAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';
import AuthButtons from './AuthButtons';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {
                this.props.auth0.isAuthenticated
                  ?
                  <BestBooks/>
                  :
                  <><h2>Welcome! Please login.</h2></>
              }
            
            </Route>
            <Route exact path="/About">
              <Devprofile />
            </Route>
            <Route exact path="/LoginButton">
              <AuthButtons />
              {
                this.props.auth0.isAuthenticated
                  ? <Profile />
                  : <p>Please login</p>
              }
              {/* <BestBooks /> */}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
