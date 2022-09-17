// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import "../sass/circularprogressbars.scss";
import { useNavigate } from 'react-router-dom'
//import { useMoralis, useMoralisFile} from "react-moralis";

//import InputField from './InputField';

//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Chart, ArcElement} from 'chart.js'
import abi from '../contract/validator.js'

import { Doughnut } from 'react-chartjs-2';
Chart.register(ArcElement);

function HomeValidator_(props) {

const [pageState, setpageState] = useState({ one: "on" })

const [siteData, setsiteData] = useState({site:[]})

const validatorAddress = '0x3535B03687543386c9f31C88fe71B16AF9925DA2';

useEffect(() => {

  
  var ABI = JSON.parse(abi);

		var contract = new props.watchweb3.eth.Contract(ABI,validatorAddress);
		
	
		props.watchweb3.eth.getBlockNumber(function(error,response){
			if(response)
			{
		
        contract.getPastEvents('siteAdded', {             
           
          fromBlock: 0,
          toBlock: 'latest'
          })
          .then(function(events){


            setsiteData(prevState => {

              return {
                  ...prevState,
                  site: events.reverse()
                    }
              })
              

  })
      }
    })
                      /*
                      console.log ("events",
                      events[0].returnValues,
                      events[0].returnValues._comment,
                      events[0].returnValues._nominee,
                      events[0].returnValues._url);
                      */

		},)

  
//},[count])   



let yesVotes = 60;
let noVotes = 30;
let notvoted = 100-(noVotes+yesVotes);
let invites = 5;
let proton = 75;
const dataChart = {
    labels: ['Scam', 'Clean', 'Not Voted'],
    datasets: [
      {
        label: '# of Votes',
        data: [noVotes, yesVotes, notvoted],
        backgroundColor: [
          'rgba(255, 20, 10, 100)',
          'rgba(32, 153, 32, 0.84)',
          'rgba(239, 243, 239, 0.84)'
        ],
        borderColor: [
          'rgba(255, 20, 10, 100)',
          'rgba(32, 153, 32, 0.84)',
          'rgba(239, 243, 239, 0.84)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const [inviteData, setinviteData] = useState({
    email: "",
    address: ""
})

  const sendInvite = () => {
  invites = invites - 1;
  }

  
  const handleChange = (name) => { return event => 
        
    setinviteData(prevState => {
      return {
          ...prevState,
          [name]: event.target.value
      }
  });
  
}

    

const changeState = (flag) => {

    setpageState(prevState => {
        return {
            ...prevState,
            one: flag
        }
    })
}
    	
return(
            <div>
                <div className="columns">
                <div className="column"></div>
                </div>
                <div className="columns">
                <div className="column"></div>   
                </div>
                <div className="columns">
                <div className="column"></div>
                </div>
                <div className="columns">
                <div className="column"></div>   
                </div>
                <div className="columns">
                <div className="column"></div>
                </div>
                <div className="columns">
                <div className="column"></div>   
                </div>
                <div className="box">           
                            
                            <div className="columns">  
                            
                            <div className="column has-text-centered is-offset-1 is-5">
                            <div className="column is-full">  
                            <nav className="panel is-light">
                            <p class="panel-heading is-centered">
                            Submitted Websites
                            </p>

                            <div class="panel-block ">
                            <br></br><br></br>
                            <div className="column is-8 is-offset-1 has-text-centered">
                            
                            https://google.com
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {
                                noVotes >=  50 ? 
                            <span class="tag is-danger">Scam!</span>:
                            yesVotes >= 50 ? 
                            <span class="tag is-success">Clean</span>:
                            <span class="tag is-info">Voting in progress</span>
                            }
                            </div>
                            <div className="column is-2">
                            <div className="columns">
                            <div className="column has-text-right">

                                
                            {
                             pageState.one && pageState.one == "on"?   
                             <a onClick={() => changeState("off") }>
                            <FontAwesomeIcon icon="fa-solid fa-caret-down fa-3x" />
                            </a>:
                            <a onClick={() => changeState("on") }>
                            <FontAwesomeIcon icon="fa-solid fa-caret-right fa-3x" />
                            </a>
                            }
                            </div>
                            <div className = "column is-4"></div>
                            </div>
                            </div>
                            </div>

                            {
                             pageState && pageState.one == "on"? 

                            <div class="panel-block ">
                            
                            <div className="column has-text-centered">
                            <div className="column is-4 has-text-centered is-offset-4">
                            <Doughnut data={dataChart} /> 
                            {
                                noVotes >=  50 ? 
                            <b>Scam!</b>:
                                yesVotes >= 50 ?
                            <b>Clean</b>:
                            <b>In progress</b>
                            }     
                            </div>    
                            <b>Remarks</b>
                            <div className="column is-offset-2 has-text-left">
                            1. Chrome is awful<br></br>
                            2. What kind of a name is googe<br></br>
                            3. Some more stuff<br></br>
                            </div>
                            <div className="column has-text-centered">
                            <a href="https://cdn.webshopapp.com/shops/305440/files/334089699/thor-hammer-of-thor-mjolnir-resin.jpg"
                            download="screenshot" target="_blank">
                              View Screenshot</a><br></br><br></br>
                            <div className="columns">
                              
                            <div className="column">        
                            <a className="button is-success">Vote "Clean"</a>
                            </div>
                            <div className="column">
                            <a className="button is-danger">Vote "Scam"</a>
                            </div>
                            </div>
                            </div>
                            </div>

                            </div>:
                            <div></div>
                            }
                            <br></br><br></br>
                               
                            
                            </nav>    
                            </div>    
                            </div>
                                
                            <div className="column has-text-centered is-5 ">
                            <div className="column">    
                            <nav className="panel is-light">
                            <p class="panel-heading is-centered">
                            Proton Token Balance
                            </p>
                            <br></br>
                            <h1 className="title is-3">
                                {proton} PTON
                            </h1>
                                
                            Total Circulation : 1000000 PTON
                            <br></br><br></br>
                            </nav>
                            
                            </div>

                            <div className="column">
                            <nav className="panel is-light">
                            <p class="panel-heading is-centered">
                            Invite a validator
                            </p>
                            
                            <div class="panel-block ">
                            <div className = "column">
                            
                            <span class="tag is-info">{invites} invites left </span><br></br><br></br>
                            <label className="label is-family-secondary">Email ID </label> 
                            <div className="control">
                                <input className="input" type="email" placeholder="satoshi@bitcoin.com" onChange={handleChange("email")}/>
                            </div><br></br>


                            <label className="label is-family-secondary">MATIC Mainnet (Polygon) Address </label> 
                            <div className="control">
                                <input className="input" type="text" placeholder="0xB545A207759a397b5A4e24AF020DaBF619C7d809" onChange={handleChange("address")}/>
                            </div><br></br>

                            <a className="button is-success" 
                                        onClick={() => sendInvite()}>
                                Send Invite</a>

                            </div>
                            </div>    
                            </nav>
                            </div>
                            </div>
                            </div>
              </div>
            </div>                                                
)


}

const HomeValidator = React.forwardRef(HomeValidator_);

export default HomeValidator;
