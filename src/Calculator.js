import { useEffect, useState } from "react";
import styled from "styled-components";
import CalculatorButton from "./components/CalculatorButton";
import Container from "./components/Container";
import Display from "./components/Display";
import Loader from "./components/Loader";
import Message from "./components/Message";


const Header = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  padding: 30px 0;
`;

const CalculatorContainer = styled.div`
  margin: 15px 0;
  box-shadow: 0 0 30px #eeeeee;
`;

const CalculatorButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
`;


const STATUS_READY = "ready";
const STATUS_LOADING = "loading";
const STATUS_DATA_SAVED = "saved";
const STATUS_DATA_FAILED = "failed";

const operations = {
  "/": (currentValue, operationValue) => currentValue / operationValue,
  "*": (currentValue, operationValue) => currentValue * operationValue,
  "-": (currentValue, operationValue) => currentValue - operationValue,
  "+": (currentValue, operationValue) => currentValue + operationValue,
  "=": (_currentValue, operationValue) => operationValue,
};

const handleOperation = (currentValue = 0, operationValue = "0", operation) => {
  return operations[operation]
    ? operations[operation](
        parseFloat(currentValue, 10),
        parseFloat(operationValue, 10)
      )
    : 0;
};

function Calculator() {
  const [value, setValue] = useState(0);
  const [displayValue, setDisplayValue] = useState("0");
  const [operation, setOperation] = useState(null);
  const [operationClicked, setOperationClicked] = useState(false);
  const [status, setStatus] = useState(STATUS_READY);

  const saveResult = (result) => {
    setStatus(STATUS_LOADING);
    window
      .fetch("http://localhost:3001/posts", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: result,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setStatus(STATUS_DATA_SAVED);
      })
      .catch(() => {
        setStatus(STATUS_DATA_FAILED);
      })
  };

  const onSumClick = () => {
    if (status !== STATUS_READY) {
      setStatus(STATUS_READY);
    } 
    const result =
      operation && !operationClicked
        ? handleOperation(value, displayValue, operation)
        : displayValue;
    setValue(result);
    setDisplayValue(String(result));
    setOperation("=");
    setOperationClicked(false);
    saveResult(result);
  };

  const onDigitClick = (digit) => {
    if (operation === "=") {
      setValue(0);
      setDisplayValue(String(digit));
      setOperation(null);
      setOperationClicked(false);
    } else if (operationClicked) {
      setValue(parseFloat(displayValue, 10));
      setDisplayValue(String(digit));
      setOperationClicked(false);
    } else {
      setDisplayValue((state) =>
        state === "0" ? String(digit) : state + digit
      );
    }
  };

  const onOperationClick = (newOperation) => {
    if (operationClicked) {
      setOperation(newOperation);
      return;
    };
    if (operation) {
      const result = handleOperation(value, displayValue, operation);
      setValue(result);
      setDisplayValue(String(result));
    }
    setOperation(newOperation);
    setOperationClicked(true);
  };

  const clearDisplay = () => {
    setValue(0);
    setDisplayValue("0");
    setOperation(null);
    setOperationClicked(false);
  };

  const handleKeyDownEvent = (event) => {
    if (event.key === "Enter" || event.key === "=") {
      event.preventDefault();
      onSumClick();
    } else if (/\d/.test(event.key)) {
      event.preventDefault();
      onDigitClick(parseFloat(event.key, 10));
    } else if (event.key in operations) {
      event.preventDefault();
      onOperationClick(event.key);
    } else if (event.key === "Clear") {
      event.preventDefault();
      clearDisplay();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  });

  return (
    <Container>
      <Header>Calculator</Header>
      {status === STATUS_DATA_SAVED && (
        <Message variant="success">Data saved!</Message>
      )}
      {status === STATUS_DATA_FAILED && (
        <Message variant="error">An error occured while saving data</Message>
      )}
      <CalculatorContainer>
        <Display value={displayValue} />
        <CalculatorButtons>
          <CalculatorButton onClick={() => onDigitClick(7)}>7</CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(8)}>8</CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(9)}>9</CalculatorButton>
          <CalculatorButton
            onClick={() => onOperationClick("/")}
            color="darkgray"
          >
            ÷
          </CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(4)}>4</CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(5)}>5</CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(6)}>6</CalculatorButton>
          <CalculatorButton
            onClick={() => onOperationClick("*")}
            color="darkgray"
          >
            x
          </CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(1)}>1</CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(2)}>2</CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(3)}>3</CalculatorButton>
          <CalculatorButton
            onClick={() => onOperationClick("-")}
            color="darkgray"
          >
            -
          </CalculatorButton>
          <CalculatorButton onClick={clearDisplay} color="red">
            C
          </CalculatorButton>
          <CalculatorButton onClick={() => onDigitClick(0)}>0</CalculatorButton>
          <CalculatorButton onClick={onSumClick} color="green">
            =
          </CalculatorButton>
          <CalculatorButton
            onClick={() => onOperationClick("+")}
            color="darkgray"
          >
            +
          </CalculatorButton>
        </CalculatorButtons>
      </CalculatorContainer>
      {status === STATUS_LOADING && <Loader content="Sending result..." />}
    </Container>
  );
}

export default Calculator;
