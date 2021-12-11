import { useState } from 'react';
import './App.css';

function App() {
  const buttons = {
    "equals": { op: "=" },
    "zero": { op: "0" },
    "one": { op: "1" },
    "two": { op: "2" },
    "three": { op: "3" },
    "four": { op: "4" },
    "five": { op: "5" },
    "six": { op: "6" },
    "seven": { op: "7" },
    "eight": { op: "8" },
    "nine": { op: "9" },
    "add": { op: "+" },
    "subtract": { op: "-" },
    "multiply": { op: "X" },
    "divide": { op: "/" },
    "decimal": { op: "." },
    "clear": { op: "AC" }
  };
  const [input, setInput] = useState("0");
  const [operation, setOperation] = useState("");

  const calculator = (event) => {
    if (!event.target.classList.contains("button-grid")) {
      const op = buttons[event.target.id].op;

      switch (op) {
        case "AC":
          setInput("0");
          setOperation("");
          break;
        case ".":
          if (input.indexOf(".") === -1) {
            setInput(input + op);
            setOperation(operation + op);
          }
          break;
        case "/":
        case "+":
        case "-":
          let eqIndex = operation.indexOf("=");
          if (eqIndex === -1) {
            if (["*", "+", "-", "/"].indexOf(operation[operation.length - 1]) !== -1
              && op !== "-"
            ) {
              setOperation(sliceSameOperators(operation.slice(0, -1) + op));
              setInput(op);
            }
            else {
              setOperation(operation + op);
              setInput(op);
            }
          } else {
            setOperation(operation.slice(eqIndex + 1) + op);
            setInput(op);
          }
          break;
        case "X":
          let index = operation.indexOf("=");
          if (index === -1) {
            if (["*", "+", "-", "/"].indexOf(operation[operation.length - 1]) !== -1) {
              setOperation(sliceSameOperators(operation.slice(0, -1) + "*"));
              setInput(op);
            }
            else {
              setOperation(operation + "*");
              setInput(op);
            }
          } else {
            setOperation(operation.slice(index + 1) + "*");
            setInput(op);
          }
          break;
        case "=":
          try {
            let res = eval(operation).toString();
            setOperation(operation + op + res);
            setInput(res);
          } catch (error) {
            setOperation("");
            setInput(error.message);
          }
          break;
        default:
          if (input === "Unexpected end of input") {
            setInput(op);
            setOperation(op);
          } else if (["X", "+", "-", "/"].indexOf(input) !== -1) {
            setInput(op);
            setOperation(operation + op);
          } else if ("0".indexOf(input) !== -1) {
            setInput(op);
            operation === "" ? setOperation(op) : setOperation(operation.slice(0, -1) + op);
          } else if (operation.indexOf("=") !== -1) {
            setInput(op);
            setOperation(op);
          } else {
            setInput(input + op);
            setOperation(operation + op);
          }
          break;
      }
    }
  }

  const sliceSameOperators = (operation) => {
    let beforeLast = ["*", "+", "/"].indexOf(operation.slice(-2, -1));
    let last = ["*", "+", "/"].indexOf(operation.slice(-1));
    if (last !== -1 && beforeLast !== -1) {
      return sliceSameOperators(operation.slice(0, -2) + operation.slice(-1));
    }
    else return operation;
  }


  return (
    <main className="main">
      <div id="calculator-wrapper">
        <div id="display-box">
          <p id='operation'>{operation}</p>
          <p id='display'>{input}</p>
        </div>
        <div className="button-grid" onClick={calculator}>
          {Object.keys(buttons).map(el => {
            return <div key={el} id={el}>{buttons[el].op}</div>
          })}
        </div>
      </div>
      <p id="profile-link">by <a href="https://www.linkedin.com/in/meriç-gündüz-198a99186/">Meric Gunduz</a></p>
    </main>
  );
}

export default App;
