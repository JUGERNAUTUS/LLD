import React from "react";
import { useNavigate } from "react-router-dom";

function Lemuriatoday(props) {
  const navigate = useNavigate();
  return (
    <>
      <a
        className="button switchlayout"
        onClick={() => navigate("/")}
      >
        Back to Lemuria
      </a>
      <img className="lemuriatoday" src="/images/lemuriatodayone.png"></img>
    </>
  );
}

export default Lemuriatoday;
