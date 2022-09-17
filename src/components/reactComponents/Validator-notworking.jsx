// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "../sass/circularprogressbars.scss";
import { useNavigate } from "react-router-dom";
//import { useMoralis, useMoralisFile} from "react-moralis";

//import InputField from './InputField';

//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart, ArcElement } from "chart.js";
import abi from "../contract/validator.js";
import protonabi from "../contract/proton.js";
import { Doughnut } from "react-chartjs-2";

var ABI = JSON.parse(abi);
var protonABI = JSON.parse(protonabi);

Chart.register(ArcElement);

function HomeValidator_(props) {
  const [pageState, setpageState] = useState({ one: "on" });

  const [siteData, setsiteData] = useState({ site: [] });

  //const siteData = props.siteData;

  const [protonData, setprotonData] = useState({ balance: 0, circulation: 0 });

  const validatorAddress = props.appState.valAddress;
  const protonAddress = props.appState.protonAddress;

  useEffect(() => {
    //new props.web3.eth.Contract(ABI,validatorAddress);
    if (!props.isWeb3) {
      console.log("No Web3");
      props.ConnectWallet();
    } else {
      var contractProton = new props.web3.eth.Contract(
        protonABI,
        protonAddress
      );
      console.log("Reached here", contractProton, props.account);

      contractProton.methods
        .balanceOf(props.account)
        .call({ from: props.account })
        .then(function (response, error) {
          console.log("response", response);
          let balance = response / Math.pow(10, 18);

          contractProton.methods
            .totalSupply()
            .call({ from: props.account })
            .then(function (res, err) {
              console.log("res", res);

              let circulation = res / Math.pow(10, 18);

              setprotonData((prevState) => {
                return {
                  ...prevState,
                  balance: balance,
                  circulation: circulation,
                };
              });
            });
        });
    }
  }, []);

  useEffect(() => {
    console.log("sitedata", props.siteData.site);
    if (!props.siteData.site) {
      console.log("uecalled");
      var contract = new props.appState.watchweb3.eth.Contract(
        ABI,
        validatorAddress
      );

      //props.watchweb3.eth.getBlockNumber(function(error,response){
      //if(response)
      //{

      contract
        .getPastEvents("siteAdded", {
          fromBlock: 0,
          toBlock: "latest",
        })
        .then(function (events) {
          for (
            let i = events.length - 1;
            i != -1 && i > events.length - 11;
            i--
          ) {
            let t = i;

            contract.methods
              .sitelist(events[t].returnValues._url)
              .call({ from: props.account })
              .then(function (response, err) {
                console.log("response", response);
                events[t].returnValues.yesVotes =
                  response.yesVotes / Math.pow(10, 18);
                events[t].returnValues.noVotes =
                  response.noVotes / Math.pow(10, 18);
                events[t].flag = false;

                if (t == 0 || t == events.length - 11) {
                  setsiteData((prevState) => {
                    return {
                      ...prevState,
                      site: events,
                    };
                  });
                }
              });
          }
        });
    }
  }, []);

  let yesVotes = 60;
  let noVotes = 30;
  let notvoted = 100 - (noVotes + yesVotes);
  let invites = 5;
  let proton = 75;
  /*const dataChart = {
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
*/

  const [inviteData, setinviteData] = useState({
    email: "",
    address: "",
  });

  const sendInvite = () => {
    invites = invites - 1;

    const server = "localhost:7171";

    let app = this;
    var url = props.appState.backend + "/sendinvite";

    var params = JSON.stringify({
      to: inviteData.email,
      body: inviteData.address,
    });

    console.log("url", url);

    console.log(params, "params");

    fetch(url, {
      method: "POST",
      mode: "cors",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization:
          "Bearer " + props.account.toLowerCase() + " " + props.appState.token,
      },
      body: params,
    })
      .then(function (response, error) {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 401) {
          props.handleSignMessage(props.account.toLowerCase(), props.web3);
        } else {
          console.log(error);
        }
      })
      .then(function (data) {
        console.log("Email response ", data);
      });
  };

  const handleChange = (name) => {
    return (event) =>
      setinviteData((prevState) => {
        return {
          ...prevState,
          [name]: event.target.value,
        };
      });
  };

  const voteProposal = (url, vote) => {
    let contract = new props.web3.eth.Contract(ABI, validatorAddress);

    contract.methods
      .castVote(url, vote)
      .send({ from: props.account })
      .then(function (response, err) {
        if (response) {
          console.log("response", response);

          if (vote) alert("Voted scam for " + url);
          else alert("Voted clean for " + url);
        }
      });
  };

  const changeState = (index, flag) => {
    let site = siteData.site;
    console.log(flag, "flag");
    site[index].flag = flag;

    setsiteData((prevState) => {
      return {
        ...prevState,
        site: site,
      };
    });
  };

  return (
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
                <p class="panel-heading is-centered">Submitted Websites</p>

                {siteData.site.map((site, index) => {
                  let ipfsURL =
                    "https//ipfs.io/" + site.returnValues._screenshot;

                  //Check list of validators for total. It will not be 100, calculate percentage

                  let notvoted =
                    100 -
                    (site.returnValues.noVotes + site.returnValues.yesVotes);

                  const dataChart = {
                    labels: ["Scam", "Clean", "Not Voted"],
                    datasets: [
                      {
                        label: "# of Votes",
                        data: [
                          site.returnValues.yesVotes,
                          site.returnValues.noVotes,
                          notvoted,
                        ],
                        backgroundColor: [
                          "rgba(255, 20, 10, 100)",
                          "rgba(32, 153, 32, 0.84)",
                          "rgba(239, 243, 239, 0.84)",
                        ],
                        borderColor: [
                          "rgba(255, 20, 10, 100)",
                          "rgba(32, 153, 32, 0.84)",
                          "rgba(239, 243, 239, 0.84)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  };

                  console.log(site);

                  return (
                    <div key={index + 1}>
                      <div class="panel-block ">
                        <br></br>
                        <br></br>
                        <div className="column is-8 is-offset-1 has-text-centered">
                          {site.returnValues._url}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {site.returnValues.noVotes >= 50 ? (
                            <span class="tag is-danger">Scam!</span>
                          ) : site.Votes >= 50 ? (
                            <span class="tag is-success">Clean</span>
                          ) : (
                            <span class="tag is-info">Voting in progress</span>
                          )}
                        </div>

                        <div className="column is-2">
                          <div className="columns">
                            <div className="column has-text-right">
                              {site.flag == true ? (
                                <a onClick={() => changeState(index, false)}>
                                  <FontAwesomeIcon icon="fa-solid fa-caret-down fa-3x" />
                                </a>
                              ) : (
                                <a onClick={() => changeState(index, true)}>
                                  <FontAwesomeIcon icon="fa-solid fa-caret-right fa-3x" />
                                </a>
                              )}
                            </div>
                            <div className="column is-4"></div>
                          </div>
                        </div>
                      </div>

                      {site.flag == true ? (
                        <div class="panel-block ">
                          <div className="column has-text-centered">
                            <div className="column is-4 has-text-centered is-offset-4">
                              <Doughnut data={dataChart} />
                              {site.returnValues.noVotes >= 50 ? (
                                <b>Scam!</b>
                              ) : site.returnValues.yesVotes >= 50 ? (
                                <b>Clean</b>
                              ) : (
                                <b>In progress</b>
                              )}
                            </div>
                            <b>Remarks</b>
                            <div className="column is-offset-2 has-text-left">
                              {site.returnValues._comment
                                .split("@_$_^", 3)
                                .map((ele) => (
                                  <p> • {ele}</p>
                                ))}
                            </div>
                            <div className="column has-text-centered">
                              <a
                                href={ipfsURL}
                                download="screenshot"
                                target="_blank"
                              >
                                View Screenshot
                              </a>
                              <br></br>
                              <br></br>
                              <div className="columns">
                                <div className="column">
                                  <a
                                    className="button is-success"
                                    onClick={() =>
                                      voteProposal(
                                        site.returnValues._url,
                                        false
                                      )
                                    }
                                  >
                                    Vote "Clean"
                                  </a>
                                </div>
                                <div className="column">
                                  <a
                                    className="button is-danger"
                                    onClick={() =>
                                      voteProposal(site.returnValues._url, true)
                                    }
                                  >
                                    Vote "Scam"
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="column has-text-centered is-5 ">
            <div className="column">
              <nav className="panel is-light">
                <p class="panel-heading is-centered">Proton Points Balance</p>
                <br></br>
                <h1 className="title is-3">{protonData.balance} PTON</h1>
                Total Circulation : {protonData.circulation} PTON
                <br></br>
                <br></br>
              </nav>
            </div>

            <div className="column">
              <nav className="panel is-light">
                <p class="panel-heading is-centered">Invite a validator</p>

                <div class="panel-block ">
                  <div className="column">
                    {/* <span class="tag is-info">{invites} invites left </span> */}
                    {/* <br></br>
                    <br></br> */}
                    <label className="label is-family-secondary">
                      Email ID{" "}
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        placeholder="satoshi@bitcoin.com"
                        onChange={handleChange("email")}
                      />
                    </div>
                    <br></br>

                    <label className="label is-family-secondary">
                      MATIC Mainnet (Polygon) Address{" "}
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="0xB545A207759a397b5A4e24AF020DaBF619C7d809"
                        onChange={handleChange("address")}
                      />
                    </div>
                    <br></br>

                    <a
                      className="button is-success"
                      onClick={() => sendInvite()}
                    >
                      Send Invite
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HomeValidator = React.forwardRef(HomeValidator_);

export default HomeValidator;
