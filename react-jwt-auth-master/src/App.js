import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import ShowBankSub from "./components/ShowBankStarter";
import ShowEmailStarter from "./components/ShowEmailStarter";
import ShowImageStarter from "./components/ShowImageStarter";
import AddBankDetails from "./components/AddBankDetails";
import AddEmailDetails from "./components/AddEmailDetails";
import AddImageDetails from "./components/AddImageDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard:undefined,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showUserBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Locker Application
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/show_bank_sub"} className="nav-link">
                  Bank Locker
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/show_email_sub"} className="nav-link">
                  Email Locker
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/show_image_sub"} className="nav-link">
                  Image Locker
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/add_bank_details"} className="nav-link">
                  Add Bank Details
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/add_image_details"} className="nav-link">
                  Add Image Details
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/add_email_details"} className="nav-link">
                  Add Email Details
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/show_bank_sub" component = {ShowBankSub}></Route>
            <Route path="/show_image_sub" component = {ShowImageStarter}></Route>
            <Route path="/show_email_sub" component = {ShowEmailStarter}></Route>
            <Route path="/add_bank_details" component = {AddBankDetails}></Route>
            <Route path="/add_image_details" component = {AddImageDetails}></Route>
            <Route path="/add_email_details" component = {AddEmailDetails}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
