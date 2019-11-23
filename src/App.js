import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Spinner, Form } from "react-bootstrap";
//import { readFile } from "fs";  //Spinner  Input
//import { tsLiteralType } from "@babel/types";
import Help from "./components/Help";
import Menu from "./components/Menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    };

    this.OnclickButton = this.OnclickButton.bind(this);
  }

  OnclickButton(e) {
    e.preventDefault();
    window.Openfile();

    this.setState({
      // fetching: false
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.fetching ? (
          <Spinner animation="border" />
        ) : (
          <>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>React + Electron</h2>
            </div>

            <p className="App-intro">
              <Button
                variant="outline-dark"
                id="openButton"
                onClick={this.OnclickButton}
              >
                Выбрать файл IONEX
              </Button>

              <div
                id="version"
                style={{
                  position: "fixed",
                  right: 10,
                  bottom: 10,
                  fontSize: 13
                }}
              >
                {" "}
                Version 0.0.1{" "}
              </div>

              <div
                id="datafile"
                style={{
                  position: "fixed",
                  left: 10,
                  bottom: 10,
                  fontSize: 13
                }}
              ></div>
            </p>

            <Help />

            <Menu />
            <Form.Control
              style={{ display: "none" }}
              as="textarea"
              id="textarea"
              rows="20"
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
