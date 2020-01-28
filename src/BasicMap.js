import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,

  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";


const wrapperStyles = {
  width: "97vw",
  margin: "0 auto"
};

const cityScale = scaleLinear()
  .domain([0, 37843000])
  .range([1, 25]);


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default class BasicMap extends Component {
  render() {
    return (
      <>
        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{ scale: 180 }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto"
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
                              outline: "none"
                            },
                            hover: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none"
                            },
                            pressed: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none"
                            }
                          }}
                        />
                      )
                  )
                }
              </Geographies>

              {this.props.data.map(({ name, coordinates, score }) => (
                <Marker key={name} coordinates={coordinates}>
                  <circle
                    fill="#F00"
                    stroke="#fff"
                    strokeWidth={2}
                    r={cityScale(score)}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </>
    );
  }
}
