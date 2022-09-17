import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ReactCSSTransitionGroup from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bulma/css/bulma.min.css";
import Web3 from "web3";
import { browserName, CustomView } from "react-device-detect";
import Nav from "./components/reactComponents/Navbar";
import HomePagealt from "./components/reactComponents/HomePagealt";
import Map from "./components/reactComponents/HighMap/Map";
import aussp from "./components/reactComponents/HighMap/LowMap/AusSHPNew";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import LLDabi from "./ABI/LLDabi";
import exchangeABI from "./ABI/exchangeABI";
import USDTABI from "./ABI/USDTABI";
import Lemuriatoday from "./components/reactComponents/Lemuriatoday";

var ABI = JSON.parse(LLDabi);
var swapABI = JSON.parse(exchangeABI);
var usdtABI = JSON.parse(USDTABI);

function App() {
  const setupWalletConnect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        80001: "https://matic-mumbai.chainstacklabs.com",
      },
    });

    await provider.enable();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts from Mobile Wallet", accounts);
    setweb3((prevState) => {
      return {
        ...prevState,
        account: web3.utils.toChecksumAddress(accounts[0]),
        web3: web3,
      };
    });

    switchNetworkMumbai(accounts[0], web3);
  };

  const params = { address: "address" };

  const [appState, setAppState] = useState({
    //protonAddress: '0x8e9a2057Dfe4dBb98A69B8daed5A8E3867e5b6d7',
    //valAddress: '0x753941E8fA3e26E501cd8327f5EB621c8b4e2583',

    modalIsActive: 0,
    isWeb3: false,
    walletOpen: false,
    width: "0%",
    nftView: 0,
    nftPane: false,
    nftSend: false,
    nfts: [
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/farm.png",
      "/images/sanctuary.png",
      "/images/sanctuary.png",
      "/images/army.png",
      "/images/army.png",
      "/images/army.png",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/education.png",
      "/images/commerce.png",
      "/images/house.jpg",
      "/images/commerce.png",
      "/images/temple.jpg",
      "/images/temple.jpg",
      "/images/house.jpg",
      "/images/house.jpg",
      "/images/palace.jpg",
      "/images/commerce.png",
      "/images/maithan.jpg",
      "/images/maithan.jpg",
    ],
    map: 1,
    aussp: JSON.parse(aussp),
    //LLDaddress: "0xF7f019707d4348d93B671db9011E6a77569D1837",
    LLDaddress: "0x99682de5586B7530d5b2765c408aDEd9a09abE9F",
    //exchangeAddr: "0x867061086f2F07e32158dD2F0ed59C20767EF242",
    exchangeAddr: "0xA515d2dC93Fb3359a56F626B8939E81D723a7Ce5",
    USDTAddr: "0x1331C77A85A048242Ab75B02703F923e059a9433",
    // USDTAddr: "0xA5a423040e0c35222CBE85d036286A6aC0a41b4f",
    NFTs: [],
    //LLDowner: "0x2711A5379d704Ce8f475D079c6b99390ca216FC7",
    LLDowner: "0xAA6b9b1c66028172D0b041385F9088c932c0A9De",
    landOwnership: [],
    inprogress: false,
    // address: "0x2711A5379d704Ce8f475D079c6b99390ca216FC7",
    address: "0xAA6b9b1c66028172D0b041385F9088c932c0A9De",
  });
  const [allUrlParams, setallUrlParams] = useState({});
  const [siteData, setsiteData] = useState({ site: [], isValidator: false });

  const [web3, setweb3] = useState({
    web3: "",
    account: "0x0000000000000000000000000000000000000000",
    isWeb3: false,
  });

  const activateModal = () => {
    console.log("amod called", appState);
    setAppState((prevState) => {
      return {
        ...prevState,
        modalIsActive: !appState.modalIsActive,
      };
    });
  };

  const walletChange = () => {
    setAppState((prevState) => {
      return {
        ...prevState,
        walletOpen: !appState.walletOpen,
        width: " 30%",
      };
    });
  };

  const switchNFT = (index) => {
    
    console.log("nftView new", index);
    setAppState((prevState) => {
      return {
        ...prevState,
        nftView: index,
      };
    });
  };

  const viewNFT = () => {
    setAppState((prevState) => {
      return {
        ...prevState,
        nftPane: !appState.nftPane,
        nftSend: false,
      };
    });
  };

  const setsendNFT = () => {
    setAppState((prevState) => {
      return {
        ...prevState,
        nftSend: !appState.nftSend,
      };
    });
  };

  const sendNFT = (tokenID) => {
    
    console.log("Transfer tokenID", tokenID);
    
    setAppState((prevState) => {
      return {
        ...prevState,
        inprogress: true,
        modalIsActive: 1,
      };
    });

    let contractLLD = new web3.web3.eth.Contract(ABI, appState.LLDaddress);

    web3.web3.eth.getGasPrice().then((price) => {
      contractLLD.methods
        .transferFrom(web3.account, appState.address, tokenID)
        .send({ from: web3.account, gasPrice: price })
        .then(function (response, err) {
          if (response) {
            console.log(response);
            //txSuccess();

            setAppState((prevState) => {
              return {
                ...prevState,
                modalIsActive: 2,
                nftPane: false,
                nftSend: false,
                inprogress: false,
              };
            });
          }
        });
    });
  };

  const checkOwner = async (account, web3) => {
    let i = 1;

    let contract = new web3.eth.Contract(ABI, appState.LLDaddress);
    let landOwnership = [];
    while (i <= 46) {
      let t = i;

      await contract.methods
        .ownerOf(i)
        .call({ from: account })
        .then(function (response, err) {
          if (response) {
            console.log("checkowner response", response, i);
            landOwnership.push(response);
            //try to change it to if(t == 6)
            if (t == 46) {
              console.log("landOwnership array updated", landOwnership);
              setAppState((prevState) => {
                return {
                  ...prevState,
                  landOwnership: landOwnership,
                };
              });
            }
          }
        });
      i++;
    }
  };

  const handleChange = () => {
    return (event) =>
      setAppState((prevState) => {
        return {
          ...prevState,
          address: event.target.value,
        };
      });
  };

  const backButton = () => {
    return (
      <div className="box backbutton is-overlay is-info mobile-secondmap-back-button">
        <a
          className="button  is-info "
          onClick={() =>
            setAppState((prevState) => {
              return {
                ...prevState,
                map: 1,
              };
            })
          }
        >
          Back
        </a>
      </div>
    );
  };

  // const navigate = useNavigate()

  const switchMapButton = () => {
    return (
      <div className="box backbutton is-overlay is-info mobile-secondmap-back-button switchbutton ">
        {/* <a
          className="button  is-info "
          onClick={() => navigate('/lemuriatoday') }
        >
          Lemuria Today
        </a> */}
      </div>
    );
  };

  const profileModal = (width) => {
    //let width = appState.width;

    console.log("Width", width);

    const openedStyle = {
      width:
        window.innerWidth < 768
          ? "100%"
          : "30%" /* width is 30% when the drawer is opened */,
    };

    const closedStyle = {
      width: "0%" /* width is 0% when the drawer is opened */,
    };
    /*
    const walletOpen ={{
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      {appState.walletOpen ? openedStyle : closedStyle}>
}}*/
    return (
      <div className="column sidepanel is-overlay is-2 mobile-outer-div-one">
        <div className="columns is-overlay is-multiline is-vcentered mobile-outer-div-two">
          <div
            class="panel sidenav tcsidenav has-text-centered has-background-link mobile-side-wallet-width"
            style={appState.walletOpen ? openedStyle : closedStyle}
          >
            {appState.walletOpen ? (
              <div>
                <div className="panel-heading has-background-link has-text-white is-4">
                  Makkal Wallet
                </div>

                <div className="column">
                  <div className="box has-background-white ">
                    <div className="has-background-white has-text-grey-dark form has-text-centered">
                      <h1 className="title is-4">Account</h1>
                      <p>
                        {window.innerWidth > 768
                          ? web3.account
                          : web3.account.slice(0, 8) +
                            "..." +
                            web3.account.slice(35, 43)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="box has-background-white ">
                    <div className="has-background-white has-text-grey-dark form has-text-centered">
                      <img
                        style={({ height: "35px" }, { width: "35px" })}
                        src="TC.png"
                      ></img>

                      <p className="is-size-3">{appState.balance} LLD</p>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="box has-background-white">
                    <div
                      className="has-background-white has-text-grey-dark form has-text-centered"
                      style={{ height: "20%" }}
                    >
                      <h1 className="title is-4">LLDs Owned</h1>

                      {!appState.nftPane ? (
                        <div className="columns is-multiline ">
                          {appState.NFTs.map((site, index) => {
                            return (
                              <div
                                key={index}
                                className="column is-3 has-text-centered"
                              >
                                <figure
                                  className={
                                    appState.nftView == index
                                      ? "image imgBorder"
                                      : "image"
                                  }
                                >
                                  <a
                                    onClick={() => {
                                      switchNFT(index);
                                    }}
                                  >
                                    <img
                                      style={
                                        ({ height: "250px" },
                                        { width: "250px" })
                                      }
                                      
                                      src={appState.nfts[appState.NFTs[index].plotID-1]}
                                    ></img>
                                  </a>
                                </figure>
                              </div>
                            );
                          })}
                        </div>
                      ) : !appState.nftSend ? (
                        <div className="rotateimg">
                          <div className="columns is-centered">
                            <div className="column is-5">
                              <figure className="image ">
                                <img
                                  src={appState.nfts[appState.NFTs[appState.nftView].plotID - 1]}
                                  alt="Placeholder image"
                                />
                              </figure>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

                      {appState.NFTs[0] && appState.nftSend ? (
                        <div
                          className="addthinBorder"
                          style={{
                            padding: "20px",
                          }}
                        >
                          <div>
                            <p className="is-size-5">Receiver's Address</p>
                          </div>
                          <br></br>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="0x000000000...."
                              onChange={handleChange()}
                            />
                          </div>
                          <br></br>
                          <a
                            className={
                              appState.inprogress
                                ? "button  is-info is-loading"
                                : "button  is-info"
                            }
                            onClick={() => {
                              sendNFT(
                                appState.NFTs[appState.nftView].plotID 
                              );
                            }}
                          >
                            Send
                          </a>

                          <br></br>
                        </div>
                      ) : appState.NFTs.length !== 0 ? (
                        <>
                          <p className="is-size-4 has-text-link">
                            Plot {appState.NFTs[appState.nftView].plotID}
                          </p>
                          <p className="is-size-5">
                            {appState.NFTs[appState.nftView].assetType}
                          </p>
                          <p className="is-size-5">
                            {appState.NFTs[appState.nftView].zone}
                          </p>
                          <br></br>
                        </>
                      ) : (
                        <div>No LLD NFTs Found</div>
                      )}

                      {!appState.nftPane && appState.NFTs[0] ? (
                        <a
                          className="button  is-link is-small is-rounded"
                          onClick={() => {
                            viewNFT();
                          }}
                        >
                          View LLD
                        </a>
                      ) : appState.NFTs[0] ? (
                        <>
                          <br></br>
                          <a
                            className="button  is-link is-small is-rounded"
                            onClick={() => {
                              setsendNFT();
                            }}
                          >
                            Transfer
                          </a>{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <a
                            className="button  is-link is-small is-rounded"
                            onClick={() => {
                              viewNFT();
                            }}
                          >
                            Back
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    className="button  is-info is-rounded "
                    onClick={() => {
                      walletChange();
                    }}
                  >
                    Close
                  </a>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div
            class="box addBorder"
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderTopRightRadius: "25px",
              borderBottomRightRadius: "25px",
              margin: "0px",
              backgroundColor: "#00003B",
            }}
          >
            <a
              style={{ margin: "0px" }}
              onClick={() => {
                walletChange();
              }}
            >
              <img style={{ height: "60px", width: "60px" }} src="TC.png"></img>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const walletModal = () => {
    console.log(appState.isWeb3, "isWeb3");
    return (
      <div className={appState.isWeb3 ? "modal " : "modal is-active"}>
        <div class="modal-content mobile-modal-content">
          <div class="modal-card">
            <section class="modal-card-body addBorder tcback">
              <br></br>
              <div className="columns is-centered is-vcentered ">
                <div className="title is-3 poppins ">Welcome to Lemuria!</div>
              </div>
              <br></br>
              <br></br>
              <br></br>

              <div className="columns is-centered is-vcentered mobile-connect-wallet-column">
                <div classname="column">
                  <a
                    className="btn get-started-btn-1 ml-0 mb-3 mobile-connect-wallet-button"
                    onClick={() => {
                      {
                        window.innerWidth > 768
                          ? ConnectWallet()
                          : window.ethereum
                          ? ConnectWallet()
                          : window.open(
                              "https://metamask.app.link/dapp/dark-shape-7076.on.fleek.co/"
                            );
                      }
                    }}
                  >
                    {window.innerWidth > 768
                      ? "Connect Wallet to proceed"
                      : window.ethereum
                      ? "Connect Wallet to proceed"
                      : "Open in Metamask"}
                  </a>
                </div>
              </div>

              <br></br>
              <br></br>

              <div className="columns is-centered"></div>

              <div className="columns is-centered">
                <div className="column is-3 has-text-centered">
                  Powered by
                  <img
                    src="TClogo.png"
                    style={({ height: "200px" }, { width: "300px" })}
                  ></img>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  const txModal = () => {
    console.log(appState.modalIsActive, "Reached txModal");

    return (
      <div
        className={appState.modalIsActive == 1 ? "modal is-active" : "modal"}
      >
        <div class="modal-background"></div>
        <div class="modal-content mobile-transaction-modal">
          <div class="modal-card">
            <section className="modal-card-body has-background-white">
              <br></br>
              <div className="columns is-centered is-vcentered ">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                  style={({ height: "400px" }, { width: "500px" })}
                ></img>
              </div>
              <div className="columns is-centered is-vcentered ">
                Transaction in Progress
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  const loadingModal = () => {
    console.log(appState.modalIsActive, "Reached loadingModal");

    return (
      <>
        <div className="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-content mobile-transaction-modal">
            <div class="modal-card">
              <section className="modal-card-body has-background-white">
                <br></br>
                <div className="columns is-centered is-vcentered ">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                    style={({ height: "400px" }, { width: "500px" })}
                  ></img>
                </div>
                <div className="columns is-centered is-vcentered ">
                  Loading Assets
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  };

  const txSuccess = () => {
    let rAddress = appState.address;

    return (
      <div
        className={appState.modalIsActive == 2 ? "modal is-active" : "modal"}
      >
        <div class="modal-background"></div>
        <div class="modal-content mobile-successful-modal">
          <div class="modal-card">
            <section class="modal-card-body addBorder tcback mobile-successful-modal-section">
              <br></br>
              <br></br>

              <div className="columns is-centered is-vcentered ">
                <br></br>
                <div className="subtitle is-5 has-text-white mobile-successful-modal-text">
                  Successfully sent Lemurialand NFT!
                </div>
              </div>

              <div className="columns is-centered is-vcentered ">
                <div className="column is-4">
                  <br></br>
                  <a
                    className="btn get-started-btn-1 ml-0 mb-3"
                    onClick={() => {
                      setAppState((prevState) => {
                        return {
                          ...prevState,
                          modalIsActive: 0,
                          address: "",
                        };
                      });

                      console.log(
                        "Calling setbalance from txSuccess",
                        web3.account
                      );
                      setBalance(web3.account, web3.web3);
                    }}
                  >
                    Close
                  </a>
                </div>
              </div>

              <div className="columns is-centered"></div>

              <div className="columns is-centered">
                <div className="column is-3 has-text-centered">
                  Powered by
                  <img
                    src="TClogo.png"
                    style={({ height: "200px" }, { width: "300px" })}
                  ></img>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  const buySuccess = () => {
    return (
      <div
        className={appState.modalIsActive == 3 ? "modal is-active" : "modal"}
      >
        <div class="modal-background"></div>
        <div class="modal-content mobile-modal-content">
          <div class="modal-card">
            <section class="modal-card-body addBorder tcback">
              <br></br>
              <br></br>

              <div className="columns is-centered is-vcentered ">
                <br></br>
                <div className="subtitle is-4 has-text-white">
                  Successfully bought Lemurialand NFT plot!
                </div>
              </div>

              <div className="columns is-centered is-vcentered mobile-connect-wallet-column">
                <div className="column is-4">
                  <br></br>
                  <br></br>
                  <a
                    className="btn get-started-btn-1 ml-0 mb-3"
                    onClick={() => {
                      setAppState((prevState) => {
                        return {
                          ...prevState,
                          modalIsActive: 0,
                        };
                      });

                      checkOwner(web3.account, web3.web3);
                      setBalance(web3.account, web3.web3);
                    }}
                  >
                    Close
                  </a>
                </div>
              </div>

              <div className="columns is-centered"></div>

              <div className="columns is-centered">
                <div className="column is-3 has-text-centered">
                  Powered by
                  <img
                    src="TClogo.png"
                    style={({ height: "200px" }, { width: "300px" })}
                  ></img>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  const urlParser = () => {
    //const { address } = useParams()
    //const queryParams = new URLSearchParams(window.location.search);

    //const address = queryParams.get('address');

    //console.log(address, "address");

    // url parsing
    //var params = { address:''};

    let parser = document.createElement("a");
    let href = window.location.href;

    const paramsArray = href.split("/");

    const linkEnd = paramsArray[paramsArray.length - 1];

    //const queryParams = new URLSearchParams(window.location.search);
    //console.log("queryParams",queryParams);
    //const address = queryParams.get('address');
    //let query = parser.search.substring(1);
    //console.log("query",query,parser.href,parser);
    //params.address = decodeURIComponent(query);

    setallUrlParams((prevState) => {
      return {
        ...prevState,
        linkEnd: linkEnd,
      };
    });
  };

  const ConnectWallet = () => {
    console.log("Reached wallet", window);
    if (window.ethereum) {
      const ethereum = window.ethereum;

      let web3 = new Web3(ethereum);
      web3.eth.transactionConfirmationBlocks = 1;
      web3.eth.transactionBlockTimeout = 300;

      ethereum.enable().then((accounts) => {
        let account = accounts[0];
        web3.eth.defaultAccount = account;

        console.log(account, appState);
        setweb3((prevState) => {
          return {
            ...prevState,
            account: web3.utils.toChecksumAddress(accounts[0]),
            web3: web3,
          };
        });

        switchNetworkMumbai(account, web3);
      });
    }
  };

  const handleSignMessage = (publicAddress, web3) => {
    console.log("Handle Sign Message Called", "web3", web3);
    web3.eth.personal
      .sign(
        web3.utils.utf8ToHex(`Welcome to Lemuria! 
        
Click to sign in.  
        
This request will not trigger a blockchain transaction or cost any gas fees. 

Wallet address: 
${publicAddress}`),
        publicAddress
      )
      .then(function (response, error) {
        if (response) {
          console.log("signature", response);

          //appState.isWeb3 = true;

          setAppState((prevState) => {
            return {
              ...prevState,
              isWeb3: true,
            };
          });

          setweb3((prevState) => {
            return {
              ...prevState,
              isWeb3: true,
            };
          });

          setBalance(publicAddress, web3);
          //updateToken(publicAddress,nonce,response);
        } else {
          console.log(error);
        }
      });
  };

  const updateToken = (publicAddress, token, sig) => {
    //const server = "localhost:5000";
    console.log("address", publicAddress);
    var url = appState.backend + "addAuthToken";

    var params = JSON.stringify({
      address: publicAddress,
      nonce: token,
      sig: sig,
    });

    fetch(url, {
      method: "POST",
      mode: "cors",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: params,
    })
      .then(function (response, error) {
        if (response) {
          return response.json();
        } else {
          console.log(error);
        }
      })
      .then(function (data) {
        console.log("update response", data);

        setAppState((prevState) => {
          return {
            ...prevState,
            token: token,
          };
        });
      });
  };

  const switchNetworkMumbai = (account, web3) => {
    //const ethereum = window.ethereum;
    //let web3 = new Web3(ethereum);
    //let web3 = appState.web3;
    web3.currentProvider
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      })
      .then(function (resonse, error) {
        console.log("account here", account);
        if (error) alert(error.message);
        else handleSignMessage(account, web3);
      });
  };

  // const ConnectWallet = () => {

  //   console.log('Calling ConnectWallet...')

  //   //console.log("Reached wallet",window.ethereum)

  //   if (window.ethereum) {

  //     //app.state.isWeb3 = true;
  //     const ethereum = window.ethereum;

  //     let web3 = new Web3(ethereum);

  //     //this.web3 = web3;

  //     ethereum.enable().then((accounts) => {
  //       //let account = accounts[0];
  //       //web3.eth.defaultAccount = account ;
  //       //console.log ( account);
  //       /*
  //       app.setState({
  //          account : account,
  //          web3 : this.web3
  //        });*/
  //       console.log('accounts', accounts);
  //       setweb3(prevState => {
  //         return {
  //           ...prevState,
  //           isWeb3: true,
  //           account: web3.utils.toChecksumAddress(accounts[0]),
  //           web3: web3
  //         }
  //       });

  //     })
  //   }
  // }

  const checkFunc = () => {
    console.log("cf called");
    axios
      .post(appState.backend + "verifytoken", {
        address: web3.account.toLowerCase(),
      })
      .then(function (response, error) {
        if (response) {
          console.log("response", response);
        } else {
          console.log("error", error);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log("err", error.response.status);
        }
      });
  };

  const setBalance = (publicAddress, web3) => {
    //let web3local = web3.web3;
    console.log("setBalance Called", publicAddress, appState.LLDaddress);

    let contract = new web3.eth.Contract(ABI, appState.LLDaddress);

    switchNFT(0);

    contract.methods
      .balanceOf(publicAddress)
      .call({ from: publicAddress })
      .then(function (response, err) {
        if (response) {
          console.log("Inside setBal, balanceOf Method response", response);
          setAppState((prevState) => {
            return {
              ...prevState,
              balance: response,
            };
          });

          if (response === "0") {
            console.log("Setting NFT array to zero", response);
            setAppState((prevState) => {
              return {
                ...prevState,
                NFTs: [],
              };
            });
          } else {
            console.log("response more than 0", response);
          }

          let i = response - 1;
          let NFTs = [];

          while (i >= 0) {
            let t = i;
            contract.methods
              .tokenOfOwnerByIndex(publicAddress, t)
              .call({ from: publicAddress })
              .then(function (response, err) {
                if (response) {
                  contract.methods
                    .fetchLandMetadata(response)
                    .call({ from: publicAddress })
                    .then(function (response, err) {
                      console.log("tokenOfOwnerByIndex response", response);
                      NFTs.push(response);

                      function GetSortOrder(prop) {
                        return function (a, b) {
                          if (parseInt(a[prop]) > parseInt(b[prop])) {
                            return 1;
                          } else if (parseInt(a[prop]) < parseInt(b[prop])) {
                            return -1;
                          }
                          return 0;
                        };
                      }
                      NFTs.sort(GetSortOrder("plotID"));
                      console.log("After Sort - NFTs from Contract", NFTs);

                      if (t == 0) {
                        console.log("NFTs from Contract", NFTs);

                        // console.log("After Sort - NFTs from Contract", NFTs);

                        setAppState((prevState) => {
                          return {
                            ...prevState,
                            NFTs: NFTs,
                          };
                        });
                        console.log("Calling checkowner from setBalance");
                        checkOwner(publicAddress, web3);
                      }
                    });
                }
              });
            i--;
          }
          if (i == -1) checkOwner(publicAddress, web3);
        }
      });
  };

  const buyNFT = (tokenID) => {
    setAppState((prevState) => {
      return {
        ...prevState,
        modalIsActive: 1,
      };
    });
    console.log(
      "appState1 buynft",
      appState,
      web3.web3.eth.transactionConfirmationBlocks
    );
    let contractSwap = new web3.web3.eth.Contract(
      swapABI,
      appState.exchangeAddr
    );

    console.log("contractSwap: " + contractSwap);
    let contractUSDT = new web3.web3.eth.Contract(usdtABI, appState.USDTAddr);

    console.log("contractUSDT", contractUSDT);
    console.log("appState2", appState);

    web3.web3.eth.getGasPrice().then((price) => {
      console.log("gasprice est", price);
      contractUSDT.methods
        .approve(appState.exchangeAddr, 10)
        .send({ from: web3.account, gasPrice: price })
        .on("transactionHash", function (hash) {
          console.log("hash", hash);
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("confirmation", confirmationNumber, receipt);
          console.log("Params", tokenID, web3.account, price);
          if (confirmationNumber === 1) {
            contractSwap.methods
              .nftSwap(tokenID, "USDT")
              .send({ from: web3.account, gasPrice: price })
              .on("transactionHash", function (hash) {
                console.log("hash", hash);
              })
              .on("receipt", (receipt) => {
                console.log("receipt", receipt);
              })
              .on("confirmation", (confirmationNumber, receipt) => {
                console.log("confirmation", confirmationNumber, receipt);
                if (confirmationNumber === 1) {
                  console.log("Swapresponse");

                  setAppState((prevState) => {
                    return {
                      ...prevState,
                      modalIsActive: 3,
                    };
                  });
                }
              });
            // .then(function (response, err) {
            //   if (response) {
            //     console.log("Swapresponse", response);

            //     setAppState((prevState) => {
            //       return {
            //         ...prevState,
            //         modalIsActive: 3,
            //       };
            //     });
            //   }
            // });
          }
        })
        .on("error", (error) => {
          console.log("error", error);
        });
    });

    // .then(function (response, err) {
    //   if (response) {
    //     contractSwap.methods
    //       .nftSwap(tokenID, "USDT")
    //       .send({ from: web3.account })
    //       .then(function (response, err) {
    //         if (response) {
    //           console.log("Swapresponse", response);

    //           setAppState((prevState) => {
    //             return {
    //               ...prevState,
    //               modalIsActive: 3,
    //             };
    //           });
    //         }
    //       });
    //   }
    // });
  };

  return (
    <>
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <HomePagealt
                  appState={appState}
                  setAppState={setAppState}
                  siteData={siteData}
                  setsiteData={setsiteData}
                  isWeb3={web3.isWeb3}
                  web3={web3.web3}
                  account={web3.account}
                  walletModal={walletModal}
                  width={appState.width}
                  profileModal={profileModal}
                  buyNFT={buyNFT}
                  txModal={txModal}
                  txSuccess={txSuccess}
                  buySuccess={buySuccess}
                  backButton={backButton}
                  loadingModal={loadingModal}
                  switchMapButton={switchMapButton}
                />
              }
            />
            <Route
              path="/lemuriatoday"
              element={
                <Lemuriatoday
                  appState={appState}
                  setAppState={setAppState}
                  siteData={siteData}
                  setsiteData={setsiteData}
                  isWeb3={web3.isWeb3}
                  web3={web3.web3}
                  account={web3.account}
                  walletModal={walletModal}
                  width={appState.width}
                  profileModal={profileModal}
                  buyNFT={buyNFT}
                  txModal={txModal}
                  txSuccess={txSuccess}
                  buySuccess={buySuccess}
                  backButton={backButton}
                  loadingModal={loadingModal}
                  switchMapButton={switchMapButton}
                />
              }
            />
            {<Route path="/map" element={<Map L={appState.L} />} />}

            {/* web3={appState.web3} />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
