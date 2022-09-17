import * as React from "react";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Map from "./HighMap/Map";
import Smallmap from "./HighMap/LowMap/Smallmap";

//import  highlevelMap from '../HighMap/leaflet.html';
//var template = { __html: highlevelMap };

function HomePagealt(props) {
  //const [appState, setAppState] = useState({modalIsActive: true});

  const appState = props.appState;
  const setAppState = props.setAppState;

  let flag = true;

  return (
    <div>
      {props.walletModal()}
      {props.txModal()}
      {props.txSuccess()}
      {props.buySuccess()}
      {props.profileModal(props.width)}
      {appState.map == 1 ? (
        <Map setAppState={setAppState} />
      ) : (
        <>
          {props.backButton()}
          <Smallmap
            setAppState={setAppState}
            landOwnership={props.appState.landOwnership}
            LLDowner={props.appState.LLDowner}
            buyNFT={props.buyNFT}
          />
        </>
      )}
    </div>
  );
}

export default HomePagealt;
