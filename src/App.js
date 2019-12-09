import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Spinner, Form } from "react-bootstrap";
//import { readFile } from "fs";  //Spinner  Input
//import { tsLiteralType } from "@babel/types";
import Help from "./components/Help";
import Menu from "./components/Menu";
import BasicMap from "./BasicMap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      earth: false,
      count: 0,
      int: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.OnclickButton = this.OnclickButton.bind(this);
    this.ButtonBack = this.ButtonBack.bind(this);
    this.ButtonNext = this.ButtonNext.bind(this);
  }

  OnclickButton(e) {
    e.preventDefault();
    window.Openfile(this.state.int);
  }
  componentWillMount() {
    localStorage.clear();
  }
  componentDidMount() {
    if (!this.state.earth) {
      let timerID = setInterval(() => {
        if (localStorage.length > 0) {
          clearInterval(timerID);
          this.setState({
            earth: true
          });
          document.body.style.background = "#20ccff";
        }
      }, 1000);
    }
  }

  handleChange(event) {
    const value = event.target.value;
 
    this.setState({
      int: value
    });
  }

  ButtonNext() {
    if (this.state.count !== 24) {
      this.setState({
        count: this.state.count + 1,
        disabled: true
      });
    }

    setTimeout(() => this.setState({ disabled: false }), 2000);
  }

  ButtonBack() {
    if (this.state.count !== 0) {
      this.setState({
        count: this.state.count - 1,
        disabled: true
      });
    }
    setTimeout(() => this.setState({ disabled: false }), 2000);
  }

  render() {
  
    //  <img src={logo} className="App-logo" alt="logo" />
    return (
      <>
        <div className="App">
          {this.state.fetching ? (
            <Spinner animation="border" />
          ) : (
            <>
              <div className="App-header">
                <h2 class="h2-main">IONEX Viewer</h2>
              </div>

              <p className="App-intro">
                <Form.Control
                  as="select"
                  style={{ marginBottom: "15px" }}
                  value={this.state.int}
                  onChange={this.handleChange}
                >
                  <option selected value="0">
                    Все точки ПЭС
                  </option>
                  <option value="100">Больше 100 </option>
                  <option value="200">Больше 200</option>
                  <option value="300">Больше 300</option>
                  <option value="400">Больше 400</option>
                </Form.Control>

                <Button
                  variant="warning"
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
                    bottom: 5,
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
                    bottom: 5,
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
        {this.state.earth && (
          <div id="mapbasic">
            <BasicMap
              data={
                JSON.parse(localStorage.getItem("massive"))[this.state.count]
              }
            />
            <div className="my-button">
              <Button variant="dark" onClick={this.ButtonBack}>
                Пред. час
              </Button>
              <div className="timeclass">Время: {this.state.count}:00</div>
              <Button variant="dark" onClick={this.ButtonNext}>
                След. час
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
