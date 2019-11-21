import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Spinner, Input } from 'react-bootstrap';
import { readFile } from 'fs';
import { tsLiteralType } from '@babel/types';

const {app} = window.require('electron').remote;




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
  
    };

this.OnclickButton = this.OnclickButton.bind(this);
  
  }

  OnclickButton(e){
    app.showErrorBox('My message', 'hi.');
    e.preventDefault();
    app.showOpenDialog({
      properties: ['openFile', 'multiSelections']
  }, function (files) {
      if (files !== undefined) {
          // handle files
      }
  });

  }





  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React1 + Electron = <span role="img" aria-label="love">😍</span></h2>
       
        </div>
     
        <p className="App-intro">

        <Spinner animation="border" />


        <Button id="openButton" onClick={this.OnclickButton}>sАнализ файла</Button>

      <input type="file" name="file" id="exampleFile" />
          <b> Releasea 0.0.1 </b>
          Version: {app.getVersion()}
        </p>
      </div>
    );
  }
}

export default App;


