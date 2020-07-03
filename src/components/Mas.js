import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Heatmap from "./heatmap/heatmap";
import config from "../config_dev";
import Plot from "react-plotly.js";

class Mas extends Component {
  constructor(props) {
    super(props);

    // create ref for SimpleHeat map component
    this.simpleHeatRef = React.createRef();
    // heatmap defaults
    this.defaultMaxOccurances = 18;
    this.defaultBlurValue = 10;
    this.defaultRadiusValue = 14;

    // component's state
    this.state = {
      data: [], // data array contains a list of sub-arrays with [x, y, occurances] values.  refer to data.js for example.
      maxOccurances: this.defaultMaxOccurances,
      blurValue: this.defaultBlurValue,
      radiusValue: this.defaultRadiusValue,
    };

    this.handleWindowClose = this.handleWindowClose.bind(this);
  }

  async handleWindowClose(e) {
    e.preventDefault();
    // dispatch a UNAUTH_USER action to invoke Cognito
  }

  render() {
    console.log("Mas.render() called");

    const { maxOccurances, blurValue, radiusValue } = this.state;

    return (
      <div className="app">
        <Heatmap
          ref={this.simpleHeatRef}
          width={config.HEATMAP_CANVAS_WIDTH}
          height={config.HEATMAP_CANVAS_HEIGTH}
          maxOccurances={maxOccurances}
          blur={blurValue}
          radius={radiusValue}
          // uncomment to send real data in
          // data={data}
        />

        <Plot
          data={[
            /*
            {

              z: [
                [130, 20.5, 120],
                [135, 21.0, 125],
                [140, 21.5, 101],
                [145, 22.0, 130],
                [150, 22.5, 160],
                [155, 23.0, 101],
                [160, 23.5, 130],
                [165, 24.0, 260],
                [170, 24.5, 301],
                [175, 25.0, 150],
                [180, 25.5, 130]
              ],
              type: "heatmapgl",
              colorscale: "Picnic",
            },
            */   
            {           
              x: [130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
              y: [20.5, 21.0, 21.5, 22.0, 22.5, 23.0, 23.5, 24.0, 24.5, 25.0, 25.5],
              z: [220, 225, 201,130, 160, 101, 130, 160, 101, 150, 150, 130],
          
              type: 'surface',
              scene: 'scene2',
              colorscale:'Viridis',
              lighting: {roughness: 0.2}
            }
          ]}
          layout={{ width: 600, height: 400, title: "A Fancy Plot" }}
        />
      </div>
    );
  }
}

Mas.propTypes = {
  // authenticated: PropTypes.bool,
  // history: PropTypes.func
};

export default Mas;
