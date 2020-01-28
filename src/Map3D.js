import React, { Component } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";

const { useState, useEffect } = React;

const vars = [
  {
    type: "Feature",
    properties: {
      mag: 100.9000000000000004,
      title: "1"
    },
    geometry: {
      type: "Point",
      coordinates: [-71.597499999999997, -15.5901, 124.04000000000001]
    }
  },
  {
    type: "Feature",
    properties: {
      mag: 120.9000000000000004,
      title: "1"
    },
    geometry: {
      type: "Point",
      coordinates: [-51.597499999999997, -15.5901, 54.04000000000001]
    }
  }
];

const Map3D = () => {
  const [equakes, setEquakes] = useState([]);
  useEffect(() => {
    // load data
    fetch(
      "//earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
    )
      .then(res => res.json())
      .then(({ features }) => setEquakes(features));
  }, []);
  const weightColor = d3
    .scaleLinear()
    .domain([0, 30])
    .range(["lightblue", "darkred"])
    .clamp(true);
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      hexBinPointsData={vars}
      hexBinPointLat={d => d.geometry.coordinates[1]}
      hexBinPointLng={d => d.geometry.coordinates[0]}
      hexBinPointWeight={d => d.properties.mag}
      hexAltitude={({ sumWeight }) => sumWeight * 0.0025}
      hexTopColor={d => weightColor(d.sumWeight)}
      hexSideColor={d => weightColor(d.sumWeight)}
    />
  );
};
export default Map3D;
