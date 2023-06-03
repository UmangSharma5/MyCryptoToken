import React from "react";
import {token,canisterId,createActor } from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client";


function Faucet() {

  const [isDisabled,setDisable] = React.useState(false);
  const [buttonText,setButton] =React.useState("Gimme gimme");

  async function handleClick(event) {
      setDisable(true);

      // const authClient = await AuthClient.create();
      // const identity = await authClient.getIdentity();

      // const authenticatedCanister = createActor(canisterId, {
      //   agentOptions : {
      //     identity,
      //   },
      // });

      const output = await token.payOut();
      setButton(output);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout"
         onClick={handleClick}
         disabled = {isDisabled}
         >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
