import * as React from "react";
import aussp from "./AusSHPNew";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import  highlevelMap from '../HighMap/leaflet.html';
//var template = { __html: highlevelMap };
let flag = 1;

function Smallmap(props) {
  const [appState, setAppState] = useState({ layer: "" });

  let images = {
    1: "/images/farm.png",
    2: "/images/palace.jpg",
    3: "/images/barracks.jpg",
    4: "/images/farm.png",
    5: "/images/palace.jpg",
    6: "/images/temple.jpg",
    7: "/images/maithan",
    8: "/images/house",
    9: "/images/palace",
    10: "/images/house",
  };

  //let L = props.L;
  let L = window.L;
  //if(flag == 1)
  //{
  //flag = 2;

  var mapExtent = [0.19456708, -6489.91623648, 9400.66551819, -0.28146649];
  var mapMinZoom = 3;
  var mapMaxZoom = 7;
  var mapMaxResolution = 0.49997186;
  var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
  var tileExtent = [0.19456708, -6489.91623648, 9400.66551819, -0.28146649];
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
    var customPopup;

    //console.log((props.checkOwner(feature.properties.id-1)), "Owner result");
    console.log(props.landOwnership, "landOwnershipoub", props.LLDowner);

    if (props.landOwnership[feature.properties.id - 1] == props.LLDowner) {
      console.log("map2", feature.properties.Zone);
      window.setFunc(props.buyNFT);

      customPopup = `
      
     
          
          
      <div className="card">
        
          <div class="card-image rotateimg">
            <figure class="image ">
            <img src="${
              images[feature.properties.id]
            }" alt="Placeholder image" />
            </figure>
          </div>
    
          <div class="card-content">
            <div class="media">
              
              <div class="media-content has-text-centered">
                <p class="title is-4">Plot #${feature.properties.id} / ${
        feature.properties.Name
      }</p>
                <p class="subtitle is-6">${feature.properties.Area}</p>
                <p class="subtitle is-6"><b>10 USDT</b></p>
                <a class="button is-info is-rounded" onclick = "buy(${
                  feature.properties.Name
                })"> Buy 
        </a> 
              </div>
            </div>
         </div>


         </div>`;

      //layer.setStyle({fillColor :'#000032',fillOpacity: 0.4,color:'black',opacity:0,weight:0});
    } else {
      console.log("map1 is being printed", feature.properties.Zone);
      layer.setStyle({
        fillColor: "red",
        color: "white",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.25,
      });

      customPopup = `<div className="card">
        
              <div class="card-image rotateimg">
                <figure class="image ">
                    <img src="${
                      images[feature.properties.id]
                    }" alt="Placeholder image" />
                </figure>
              </div>
        
              <div class="card-content">
                <div class="media">
                  
                  <div class="media-content has-text-centered">
                  <p class="title is-4">Plot #${
                    feature.properties.id
                  } / House}</p>
                  <p class="subtitle is-6">${feature.properties.Area}</p>
                    
                  </div>
                </div>
             </div>
             </div>`;
    }

    //var customPopup = "<h2>Name: " + feature.properties.Name + "</h2>" + "<h2>Survey No: " + feature.properties['Survey No'] + "</h2>" + "<h2>Zone: " + feature.properties.Zone + "</h2 style=" + "font-size:20px;" + "><button>Buy</button>"

    // specify popup options
    var customOptions = {
      maxWidth: "1000",
      width: "1000",
      className: "customPopup",
    };

    layer.bindPopup(customPopup, customOptions);

    //layer.bindPopup(feature.properties.Name);
    layer.on("click", function () {
      console.log("Called - ", feature.properties.Name);
    });
  };

  const polystyle = (feature) => {
    return {
      fillColor: "blue",
      weight: 3,
      opacity: 1,
      color: "white", //Outline color
      fillOpacity: 0.0,
    };
  };

  useEffect(() => {
    var layer;
    var map = new L.Map("map", {
      maxZoom: mapMaxZoom,
      minZoom: mapMinZoom,
      crs: crs,
    });

    layer = L.tileLayer("HighMap/LowMap/{z}/{x}/{y}.png", {
      minZoom: mapMinZoom,
      maxZoom: mapMaxZoom,
      noWrap: true,
      tms: false,
    }).addTo(map);

    console.log("layer", layer);

    map.fitBounds([
      crs.unproject(L.point(mapExtent[2], mapExtent[3])),
      crs.unproject(L.point(mapExtent[0], mapExtent[1])),
    ]);

    L.control.mousePosition().addTo(map);

    var AUSSP = JSON.parse(aussp);
    L.geoJSON(AUSSP, {
      onEachFeature: onEachFeature,
      style: polystyle,
    }).addTo(map);

    setAppState((prevState) => {
      return {
        ...prevState,
        layer: layer,
      };
    });
  }, []);

  return (
    <div
      id="map"
      style={{ zindex: "-1", position: "relative", height: "100vh" }}
    ></div>
  );

  //}
}

export default Smallmap;
