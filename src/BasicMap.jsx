import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import geoUrl from "./world-110m.json"

const wrapperStyles = {
  width: "97vw",
  margin: "0 auto",
};

const cityScale = scaleLinear()
  .domain([0, 37843000])
  .range([1, 25]);

//const geoUrl = "/world-110m.json";
//const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
export default class BasicMap extends Component {
  ShowCoordinates(name, coordinates, score, e) {
    var textstart;
    if (parseInt(score) > 1) {
      textstart = "Выбранна точка: ";
    }
    e.preventDefault();
    var text =
      textstart +
      "Долгота: " +
      coordinates[0] +
      " °" +
      ", Широта: " +
      coordinates[1] +
      " °" +
      ", Значение ПЭС: " +
      Math.round(parseInt(score) / 18000) +
      " TECU";
    document.getElementById("coordinatesmarker").innerHTML = text;
  }
  render() {
    return (
      <>
        <div style={wrapperStyles}>
          <div style={{ color: "#fff" }}>
            <div style={{ minHeight: "30px" }} id="coordinatesmarker" />
          </div>
          <ComposableMap
            projectionConfig={{ scale: 180 }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <ZoomableGroup center={[0, 0]} disablePanning>
              <Geographies geography={geoUrl}>
                {({ geographies, projection, i }) =>
                  geographies.map(
                    (geo, i) =>
                      geo.id !== "ATA" && (
                        <Geography
                          key={i}
                          geography={geo}
                          projection={projection}
                          style={{
                            default: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            hover: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                          }}
                        />
                      )
                  )
                }
              </Geographies>
              {this.props.data.map(({ name, coordinates, score }) => (
                <Marker
                  key={name}
                  coordinates={coordinates}
                  onMouseOver={(e) =>
                    this.ShowCoordinates(name, coordinates, score, e)
                  }
                >
                  <circle
                    fill="#F00"
                    stroke="#fff"
                    strokeWidth={2}
                    r={cityScale(score)}
                  />
                </Marker>
              ))}
           
              {this.props.marker && (
                <Marker
                  key={"Землетрясение"}
                  coordinates={[
                    this.props.markerdolgota,
                    this.props.markershirota,
                  ]}
                >
                  <circle
                    style={{
                      stroke: "#2bbc00",
                      strokeWidth: 80,
                      opacity: 0.8,
                    }}
                    fill="#000"
                    r={2}
                  />
                </Marker>
              )}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </>
    );
  }
}
