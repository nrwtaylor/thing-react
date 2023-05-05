import React, { useState, useEffect } from "react";
//  const messages = [];

export default function useStream(amount, quantities) {
  //  const messages

  //const quantities = [];
  //const amount = 99;

  const getMessage = () => {
    return null;
  };

  const amountRef = React.createRef();
  amountRef.current = amount;

  const [streamPoints, setStreamPoints] = useState([]);
  const [streamPointer, setStreamPointer] = useState();
  const [username, setUsername] = useState();

  function getStream() {
    //console.log("Stream tick");
    const a = amountRef.current;
    console.log("useStream AmountRef.current", a);

    var conditionedAmount = parseFloat(a);

    console.log("useStream conditionedAmount", conditionedAmount);
    // Create a new array based on current state:
    let s = [...streamPoints];
    const amounts = [];

    if (quantities !== undefined) {
      quantities.map((quantity) => {
        const amount = parseFloat(quantity.amount);
        amounts.push(amount);
      });
      conditionedAmount = amounts[1];
    }

    // Add item to it
    s.push({
      name: "asdf",
      student: 24,
      fees: 1,
      value: conditionedAmount,
      amount: conditionedAmount,
      amount2: amounts && amounts[0],
      amount3: amounts && amounts[2],
    });

    const maxStreamPoints = 100;

    const excessPoints = s.length - maxStreamPoints;

    if (excessPoints >= 0) {
      const a = (streamPointer + 1) % maxStreamPoints;

      setStreamPointer(a);

      //f.splice(0, excessPoints);
      s.shift();
    }

    console.log("Stream f", s);
    // Set state
    setStreamPoints(s);
  }

  useEffect(() => {
    console.log("useStream amount", amount);
    getStream();
  }, [amount]);

  return {
    getStream: getStream,
    streamPoints: streamPoints,
    streamPointer: streamPointer,
    username,
  };
}
