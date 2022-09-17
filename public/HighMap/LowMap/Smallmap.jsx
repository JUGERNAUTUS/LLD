import * as React from "react";
import aussp from "./AusSHPNew";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import  highlevelMap from '../HighMap/leaflet.html';
//var template = { __html: highlevelMap };
let flag = 1;

function Smallmap(props) {
  const [appState, setAppState] = useState({ layer: "" });
  const [landOwnership, setLandOwnership] = useState([]);
  let oFlag = false;

  //let L = props.L;
  let L = window.L;
  //if(flag == 1)
  //{
  //flag = 2;

  let images = {
    1: "/images/farm.png",
    2: "/images/farm.png",
    3: "/images/farm.png",
    4: "/images/farm.png",
    5: "/images/farm.png",
    6: "/images/farm.png",
    7: "/images/farm.png",
    8: "/images/farm.png",
    9: "/images/farm.png",
    10: "/images/farm.png",
    11: "/images/farm.png",
    12: "/images/farm.png",
    13: "/images/farm.png",
    14: "/images/farm.png",
    15: "/images/farm.png",
    16: "/images/farm.png",
    17: "/images/farm.png",
    18: "/images/farm.png",
    19: "/images/farm.png",
    20: "/images/farm.png",
    21: "/images/sanctuary.png",
    22: "/images/sanctuary.png",
    23: "/images/army.png",
    24: "/images/army.png",
    25: "/images/army.png",
    26: "/images/house.jpg",
    27: "/images/house.jpg",
    28: "/images/house.jpg",
    29: "/images/house.jpg",
    30: "/images/house.jpg",
    31: "/images/house.jpg",
    32: "/images/house.jpg",
    33: "/images/house.jpg",
    34: "/images/house.jpg",
    35: "/images/education.png",
    36: "/images/commerce.png",
    37: "/images/house.jpg",
    38: "/images/commerce.png",
    39: "/images/temple.jpg",
    40: "/images/temple.jpg",
    41: "/images/house.jpg",
    42: "/images/house.jpg",
    43: "/images/palace.jpg",
    44: "/images/commerce.png",
    45: "/images/maithan.jpg",
    46: "/images/maithan.jpg",
  };

  var mapExtent = [0.19456708, -6489.91623648, 9400.66551819, -0.28146649];
  var mapMinZoom = 5;
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
    console.log(props.landOwnership, "landOwnershipcom", props.LLDowner);
    window.setFunc(props.buyNFT);

    // if (props.landOwnership[feature.properties.id - 1] == props.LLDowner) {
    //   console.log("map2", feature.properties.Zone);
    //   window.setFunc(props.buyNFT);

    //   customPopup = `

    //   <div className="card">

    //       <div class="card-image rotateimg">
    //         <figure class="image ">
    //             <img src="download.jpg" alt="Placeholder image" />
    //         </figure>
    //       </div>

    //       <div class="card-content">
    //         <div class="media">

    //           <div class="media-content has-text-centered">
    //             <p class="title is-4">${feature.properties.Name} / Survey No. ${
    //     feature.properties["Survey No"]
    //   }</p>
    //             <p class="subtitle is-6">${feature.properties["Zone"]}</p>
    //             <p class="subtitle is-6"><b>10 USDT</b></p>
    //             <a class="button is-info is-rounded" onclick = "buy(${
    //               feature.properties.id - 1
    //             })"> Buy
    //     </a>
    //           </div>
    //         </div>
    //      </div>

    //      </div>`;

    //   //layer.setStyle({fillColor :'#000032',fillOpacity: 0.4,color:'black',opacity:0,weight:0});
    // } else {
    //   console.log("map1 is being printed", feature.properties.Zone);
    //   layer.setStyle({
    //     fillColor: "black",
    //     color: "white",
    //     weight: 0,
    //     opacity: 0.8,
    //     fillOpacity: 0.25,
    //   });

    //   customPopup = `<div className="card">

    //           <div class="card-image rotateimg">
    //             <figure class="image ">
    //                 <img src="download.jpg" alt="Placeholder image" />
    //             </figure>
    //           </div>

    //           <div class="card-content">
    //             <div class="media">

    //               <div class="media-content has-text-centered">
    //                 <p class="title is-4">${feature.properties.Name} / Survey No. ${feature.properties["Survey No"]}</p>
    //                 <p class="subtitle is-6">${feature.properties["Zone"]}</p>

    //               </div>
    //             </div>
    //          </div>
    //          </div>`;
    // }

    console.log("map1 is being printed", feature.properties.Zone);
    layer.setStyle({
      fillColor: "black",
      color: "white",
      weight: 0,
      opacity: 0.8,
      fillOpacity: 0.25,
    });

    if (feature.properties.id <= 100) {
      customPopup = `<div className="card">
        
      <div class="card-image rotateimg">
        <figure class="image ">
        <img src="${images[feature.properties.id]}" alt="Placeholder image" />
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
    } else {
      customPopup = `<div className="card">
        
              <div class="card-image rotateimg">
                <figure class="image ">
                <img src="/images/house.jpg" alt="Placeholder image" />
                </figure>
              </div>
        
              <div class="card-content">
                <div class="media">
                  
                  <div class="media-content has-text-centered">
                  <p class="title is-4">Plot #${feature.properties.id} / House</p>
                  <p class="subtitle is-6">${feature.properties.Area}</p>
                  <p class="subtitle is-6"><b>10 USDT</b></p>
                <a class="button is-info is-rounded" onclick = "buy(${feature.properties.Name})"> Buy 
        </a> 
                  </div>
                </div>
             </div>
             </div>`;
    }

    ////var customPopup = "<h2>Name: " + feature.properties.Name + "</h2>" + "<h2>Survey No: " + feature.properties['Survey No'] + "</h2>" + "<h2>Zone: " + feature.properties.Zone + "</h2 style=" + "font-size:20px;" + "><button>Buy</button>"

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

    layer.on("mouseover", function () {
      layer.setStyle({
        fillColor: "red",
        color: "white",
        weight: 0,
        opacity: 0.5,
        fillOpacity: 0.25,
      });
    });

    layer.on("mouseout", function () {
      layer.setStyle({
        fillColor: "black",
        color: "white",
        weight: 0,
        opacity: 0.8,
        fillOpacity: 0.25,
      });
    });
  };

  const polystyle = (feature) => {
    return {
      fillColor: "blue",
      weight: 0,
      opacity: 0.7,
      color: "white", //Outline color
      fillOpacity: 0.0,
    };
  };

  useEffect(() => {
    console.log("landownershiparray flag", props.landOwnership, oFlag);
    //setLandOwnership(props.landOwnership);

    if (props.landOwnership.length > 0 && oFlag === false) {
      console.log("Inside UE");
      //oFlag = true
      let layer;
      let map = new L.Map("map", {
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

      let AUSSP = JSON.parse(aussp);
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
    }
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