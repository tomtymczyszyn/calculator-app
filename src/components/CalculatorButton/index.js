import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

const getColor = (color) => {
  switch (color) {
    case "green":
      return "#99FF99";
    case "red":
      return "#FF9999";
    case "darkgray":
      return "#ccc";
    case "gray":
    default:
      return "#efefef";
  }
};

const CalculatorButtonStyled = styled.button`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: ${({ color }) => getColor(color)};
  border: 1px solid #ffffff;
  cursor: pointer;
`;

const CalculatorButton = ({ onClick, color, value, children, ...props }) => {
  return (
    <CalculatorButtonStyled onClick={onClick} color={color} {...props}>
      {children}
    </CalculatorButtonStyled>
  );
};

CalculatorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  color: PropTypes.string,
};

CalculatorButton.defaultProps = {
  value: null,
  color: "gray",
};

export default CalculatorButton;
