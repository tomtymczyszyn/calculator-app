import React from "react";
import styled from "styled-components";

const DisplayStyled = styled.div`
  padding: 15px;
  font-size: 45px;
  font-weight: 500;
  text-align: right;
  overflow-x: scroll;
`;

const Display = ({ value }) => {
  return <DisplayStyled>{value}</DisplayStyled>;
};


export default React.memo(Display);
