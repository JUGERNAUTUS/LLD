import * as React from "react";
import sashp from "../HighMap/SA-SHPfile";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
//import  highlevelMap from '../HighMap/leaflet.html';
//var template = { __html: highlevelMap };
let flag = 1;

function Map(props) {
  const [appState, setAppState] = useState({ layer: "" });

  //let L = props.L;
  let L = window.L;
  //if(flag == 1)
  //{
  //flag = 2;
  console.log(L.Map, "L.Map");
  var mapExtent = [0.15506483, -4566.5674517, 6521.10871887, 0.40008978];
  var mapMinZoom = 3;
  var mapMaxZoom = 6;
  var mapMaxResolution = 0.49999645;
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

    if (feature.properties.Name === "Kabadapuram") {
      layer.setStyle({
        fillColor: "brown",
        color: "grey",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.25
      });
    } else {
      layer.setStyle({
        fillColor: "#f7941d",
        color: "grey",
        weight: 2,
        opacity: 1,
        fillOpacity: 0,
      });
    }

    layer.on("click", function () {
      console.log("Called - ", feature.properties.Name);

      if (feature.properties.Name === "Ezthenga naadu" || feature.properties.Name === "Kabadapuram") {
        props.setAppState((prevState) => {
          return {
            ...prevState,
            map: 2,
          };
        });
      } else {
        console.log("Map In Development - ");
      }
    });

    // if (feature.properties.Name == "Map 1") {
    //   console.log("map1", feature.properties.Name);

    //   layer.setStyle({
    //     fillColor: "#f7941d",
    //     color: "grey",
    //     weight: 2,
    //     opacity: 1,
    //   });

    //   layer.on("click", function () {
    //     console.log("Called - ", feature.properties.Name);

    //     props.setAppState((prevState) => {
    //       return {
    //         ...prevState,
    //         map: 2,
    //       };
    //     });
    //   });
    // } else {
    //   console.log("map2", feature.properties.Name);
    //   layer.setStyle({
    //     fillColor: "#000032",
    //     fillOpacity: 0.2,
    //     color: "black",
    //     opacity: 0,
    //     weight: 0,
    //   });
    // }

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
    layer = L.tileLayer("HighMap/{z}/{x}/{y}.png", {
      minZoom: mapMinZoom,
      maxZoom: mapMaxZoom,
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

    //-1365, 2617
    var markerA = new L.marker([-1465.5, 2317.3], { opacity: 0.01 }); //opacity may be set to zero
    markerA.bindTooltip("Elkundra naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    //-1985, 2205
    var markerG = new L.marker([-1985.5, 1905.3], { opacity: 0.01 }); //opacity may be set to zero
    markerG.bindTooltip("Ezthenga naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    //-2661, 2737
    var markerF = new L.marker([-2661.5, 2437], { opacity: 0.01 }); //opacity may be set to zero
    markerF.bindTooltip("Ezkurumpanai naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    //-3237, 3381
    var markerE = new L.marker([-3437.5, 3581.3], { opacity: 0.01 }); //opacity may be set to zero
    markerE.bindTooltip("Ezmadurai naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    //-2785,3989
    var markerD = new L.marker([-2785.5, 4189.3], { opacity: 0.01 }); //opacity may be set to zero
    markerD.bindTooltip("Elpinpaalai naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    //--2281,3673
    var markerC = new L.marker([-2281.5, 3973.3], { opacity: 0.01 }); //opacity may be set to zero
    markerC.bindTooltip("Elmunpaalai naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    //-1681. 3465
    var markerB = new L.marker([-1681.5, 3765.3], { opacity: 0.01 }); //opacity may be set to zero
    markerB.bindTooltip("Elkunakarai naadu", {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    });

    let sevenmarkergroup = new L.FeatureGroup();
    sevenmarkergroup.addLayer(markerA);
    sevenmarkergroup.addLayer(markerB);
    sevenmarkergroup.addLayer(markerC);
    sevenmarkergroup.addLayer(markerD);
    sevenmarkergroup.addLayer(markerE);
    sevenmarkergroup.addLayer(markerF);
    sevenmarkergroup.addLayer(markerG);

    //map.addLayer(sevenmarkergroup);

    let wMarkerIcon = new L.Icon({
      iconUrl: "/images/wpin.png",
      iconSize: [35, 35],
      iconAnchor: [20, 40],
    });

    let lemuriaLabel = new L.marker([-2371.5, 2800.3], { opacity: 0.01 });
    lemuriaLabel.bindTooltip("Lemuria", {
      permanent: true,
      className: "lemuria-label",
      offset: [0, 0],
    });

    let KabadapuramMain = new L.marker([-2063.5, 2515.3], {
      icon: wMarkerIcon,
    });
    KabadapuramMain.bindTooltip("", {
      permanent: true,
      className: "lemuria-label",
      offset: [0, 0],
    });

    let mainlabelgroup = new L.FeatureGroup();

    mainlabelgroup.addLayer(lemuriaLabel);
    mainlabelgroup.addLayer(KabadapuramMain);

    map.addLayer(mainlabelgroup);

    let markerIcon = new L.Icon({
      iconUrl: "/images/pin.png",
      iconSize: [30, 30],
      iconAnchor: [20, 40],
    });

    let whiteMarkerIcon = new L.Icon({
      iconUrl: "/images/wpin.png",
      iconSize: [35, 35],
      iconAnchor: [20, 40],
    });

    //-3392, 3906, Then Madurai
    let ThenMadurai = new L.marker([-3392.5, 3906.3], { icon: markerIcon });
    ThenMadurai.bindTooltip("Then Madurai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1698, 2840, Madurai
    let Madurai = new L.marker([-1698.5, 2840.3], { icon: markerIcon });
    Madurai.bindTooltip("Madurai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-2735 4579 Muththoor
    let Muththoor = new L.marker([-2735.5, 4579.3], { icon: markerIcon });
    Muththoor.bindTooltip("Muththoor", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-2158 2677 Kabadapuram
    let Kabadapuram = new L.marker([-2063.5, 2515.3], {
      icon: whiteMarkerIcon,
    });
    Kabadapuram.bindTooltip("Kabadapuram", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-3249 3657 Kumariyaru
    let Kumariyaaru = new L.marker([-3249.5, 3657.3], { icon: markerIcon });
    Kumariyaaru.bindTooltip("Kumariyaaru", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1821 3897 Thamirabarani aaru
    let ThamirabaraniAaru = new L.marker([-1821.5, 3897.3], {
      icon: markerIcon,
    });
    ThamirabaraniAaru.bindTooltip("Thamirabarani aaru", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //--2452 2325 Pahruliyaru
    let Pahruliyaru = new L.marker([-2452.5, 2325.3], { icon: markerIcon });
    Pahruliyaru.bindTooltip("Pahruliyaru", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1904 2881 Meru Malai
    let MeruMalai = new L.marker([-1904.5, 2881.3], { icon: markerIcon });
    MeruMalai.bindTooltip("Meru Malai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1351 2635 Kudagu Malai
    let KudaguMalai = new L.marker([-1351.5, 2635.3], { icon: markerIcon });
    KudaguMalai.bindTooltip("Kudagu Malai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-2676 3472 Peru Aaru
    let PeruAaru = new L.marker([-2676.5, 3472.3], { icon: markerIcon });
    PeruAaru.bindTooltip("Peru Aaru", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1609 3472 Ponniyaaru (Kaviri)
    let Ponniyaaru = new L.marker([-1609.5, 3472.3], { icon: markerIcon });
    Ponniyaaru.bindTooltip("Ponniyaaru (Kaviri)", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1469 2753 Pothigai Malai
    let PothigaiMalai = new L.marker([-1469.5, 2753.3], { icon: markerIcon });
    PothigaiMalai.bindTooltip("Pothigai Malai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-3061 3280 Kumari Malai
    let KumariMalai = new L.marker([-3061.5, 3280.3], { icon: markerIcon });
    KumariMalai.bindTooltip("Kumari Malai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-1251 2895 Vindha Malai
    let VindhaMalai = new L.marker([-1251.5, 2895.3], { icon: markerIcon });
    VindhaMalai.bindTooltip("Vindha Malai (Vinthiya Malai)", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //-2535 3979 Peru Malai
    let PeruMalai = new L.marker([-2535.5, 3979.3], { icon: markerIcon });
    PeruMalai.bindTooltip("Peru Malai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    //1833 2230 Sinthu nadhi
    let SinthuNadhi = new L.marker([1833.5, 2230.3], { icon: markerIcon });
    SinthuNadhi.bindTooltip("Sinthu nadhi", {
      permanent: true,
      className: "city-label",

      offset: [0, 0],
    });

    // 1231 2464 Imaya Malai
    let ImayaMalai = new L.marker([1231.5, 2464.3], { icon: markerIcon });
    ImayaMalai.bindTooltip("Imaya Malai", {
      permanent: true,
      className: "city-label",
      offset: [0, 0],
    });

    let citymarkergroup = new L.FeatureGroup();

    citymarkergroup.addLayer(ThenMadurai);
    citymarkergroup.addLayer(Madurai);
    citymarkergroup.addLayer(Muththoor);
    citymarkergroup.addLayer(Kabadapuram);
    citymarkergroup.addLayer(Kumariyaaru);
    citymarkergroup.addLayer(ThamirabaraniAaru);
    citymarkergroup.addLayer(Pahruliyaru);
    citymarkergroup.addLayer(MeruMalai);
    citymarkergroup.addLayer(KudaguMalai);
    citymarkergroup.addLayer(PeruAaru);
    citymarkergroup.addLayer(Ponniyaaru);
    citymarkergroup.addLayer(PothigaiMalai);
    citymarkergroup.addLayer(KumariMalai);
    citymarkergroup.addLayer(VindhaMalai);
    citymarkergroup.addLayer(PeruMalai);
    citymarkergroup.addLayer(SinthuNadhi);
    citymarkergroup.addLayer(ImayaMalai);

    map.on("zoomend", function () {
      console.log("xoom", map.getZoom());
      if (map.getZoom() <= 3) {
        try {
          map.removeLayer(sevenmarkergroup);
          map.removeLayer(citymarkergroup);
        } catch (error) {
          console.log("err", error);
        }
        map.addLayer(mainlabelgroup);
      } else if (map.getZoom() === 4) {
        try {
          map.removeLayer(mainlabelgroup);
          map.removeLayer(citymarkergroup);
        } catch (error) {
          console.log("err", error);
        }
        map.addLayer(sevenmarkergroup);
      } else if (map.getZoom() > 4) {
        try {
          map.removeLayer(mainlabelgroup);
          map.removeLayer(sevenmarkergroup);
        } catch (error) {
          console.log("err", error);
        }
        map.addLayer(citymarkergroup);
      }
    });

    // map.dragging.disable();

    setAppState((prevState) => {
      return {
        ...prevState,
        layer: layer,
      };
    });
  }, []);

  const navigate = useNavigate();

  // const switchMapButton = () => {
  //   return (
  //     <div className="box backbutton is-overlay is-info mobile-secondmap-back-button switchbutton customeditlt">
  //       <a
  //         className="button  is-info "
  //         onClick={() => navigate("/lemuriatoday")}
  //       >
  //         Lemuria Today
  //       </a>
  //     </div>
  //   );
  // };

  const switchMapButton = () => {
    return (
      <a
        className="button switchlayout"
        onClick={() => navigate("/lemuriatoday")}
      >
        Lemuria Today
      </a>
    );
  };

  return (
    <>
      {switchMapButton()}
      <div
        id="map"
        style={{ zindex: "-1", position: "relative", height: "100vh"}}
      ></div>
    </>
  );

  //}
}

export default Map;
