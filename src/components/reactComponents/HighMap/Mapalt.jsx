import * as React from "react";
import sashp from "../HighMap/SA-SHPfile";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import  highlevelMap from '../HighMap/leaflet.html';
//var template = { __html: highlevelMap };
let flag = 1;

function Map(props) {
  //let L = props.L;
  let L = window.L;
  if (flag == 1) {
    flag = 2;
    console.log(L.Map, "L.Map");
    var mapExtent = [0.15506483, -4566.5674517, 6521.10871887, 0.40008978];
    var mapMinZoom = 3;
    var mapMaxZoom = 5;
    var mapMaxResolution = 0.99999289;
    var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
    var tileExtent = [0.15506483, -4566.5674517, 6521.10871887, 0.40008978];
    var crs = L.CRS.Simple;
    crs.transformation = new L.Transformation(
      1,
      -tileExtent[0],
      -1,
      tileExtent[3]
    );
    crs.scale = function (zoom) {
      return Math.pow(2, zoom) / mapMinResolution;
    };
    crs.zoom = function (scale) {
      return Math.log(scale * mapMinResolution) / Math.LN2;
    };

    const onEachFeature = (feature, layer) => {
      console.log(" Reached on Each Feature");

      var customPopup = "<h2>Name: " + feature.properties.Name + "</h2>";

      if (feature.properties.Name == "Map  1") {
        console.log("map1", feature.properties.Name);

        layer.setStyle({
          fillColor: "#f7941d",
          color: "grey",
          weight: 2,
          opacity: 1,
        });

        layer.on("click", function () {
          console.log("Called - ", feature.properties.Name);
          window.location.href = "./LowMap/leaflet.html";
        });
      } else {
        console.log("map2", feature.properties.Name);
        layer.setStyle({
          fillColor: "#000032",
          fillOpacity: 0.2,
          color: "black",
          opacity: 0,
          weight: 0,
        });
      }

      // specify popup options
      var customOptions = {
        maxWidth: "400",
        width: "200",
        className: "popupCustom",
      };
      //layer.bindPopup(customPopup,customOptions);
      //layer.bindPopup(feature.properties.Name);
    };

    useEffect(() => {
      var map = new L.Map("map", {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: crs,
      });

      var layer;
      console.log("flag", flag);
      layer = L.tileLayer("{z}/{x}/{y}.png", {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        attribution:
          'Rendered with <a href="https://www.maptiler.com/desktop/">MapTiler Desktop</a>',
        noWrap: true,
        tms: false,
      }).addTo(map);

      console.log(layer, "tileLayer");

      map.fitBounds([
        crs.unproject(L.point(mapExtent[2], mapExtent[3])),
        crs.unproject(L.point(mapExtent[0], mapExtent[1])),
      ]);
      L.control.mousePosition().addTo(map);

      var SASHP = JSON.parse(sashp);
      L.geoJSON(SASHP, {
        onEachFeature: onEachFeature,
      }).addTo(map);
    }, []);

    return (
      <div>
        <input
          id="slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          oninput={layer.setOpacity("1")}
        ></input>
      </div>
    );
  }
}

export default Map;
