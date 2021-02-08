import styled from "styled-components";

const Message = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #333;
  background-color: ${({variant}) => {
    switch(variant) {
      case 'success':
        return '#99ff99';
      case 'error':
        return '#ff9999';
      case 'info':
      default: 
        return '#0055FF';
    }
  }};
  padding: 15px 5px;
  text-align: center;
  margin-bottom: 15px;
`;

export default Message;
