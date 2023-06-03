import React from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";
 
function Transfer() {
  
  const [inputId, setInputId] = React.useState("");
  const [inputAmount,setAmount] = React.useState("");
  const [isDisabled,setDisable] = React.useState(false);
  const [feedback,setFeedback] = React.useState("");
  const [isHidden,setHidden] = React.useState(true);

  async function handleClick() {
      setHidden(true);
      setDisable(true);
      const resipient = Principal.fromText(inputId);
      const amountToTransfer = Number(inputAmount);
      const result = await token.transfer(resipient,amountToTransfer);
      setFeedback(result);
      setHidden(false);
      setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={inputId}
                onChange={(e) => {setInputId(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {inputAmount}
                onChange={(e) =>{setAmount(e.target.value)}}

              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick}  disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden} >{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
