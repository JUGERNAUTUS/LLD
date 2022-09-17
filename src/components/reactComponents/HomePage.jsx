import * as React from "react";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import  highlevelMap from '../HighMap/leaflet.html';
//var template = { __html: highlevelMap };


function HomePage(props) {    
    
    const [appState, setAppState] = useState({modalIsActive: true});

    

    const iframe = () => {
        return {
            __html: '<iframe src="./HighMap/leaflet.html" width="100%" height="1000"></iframe>'
        }
    }
    
    const activateModal = () => {
        console.log('amod called', appState)
        setAppState(prevState => {
          return {
            ...prevState,
            modalIsActive: !appState.modalIsActive
          }
        })
      }; 
    
    let flag = true;
 console.log(props.appState.walletOpen, "walletOpen");
  return (
     <div> 
    <div dangerouslySetInnerHTML={iframe()} />
    {props.walletModal()}
    {props.profileModal(props.width)}
    
    </div>


  );


};


export default HomePage;
