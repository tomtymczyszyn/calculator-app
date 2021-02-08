import styled from "styled-components";
const LoaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;
const LoaderIcon = styled.div`
  height: 0;
  width: 0;
  padding: 15px;
  border: 6px solid #ccc;
  border-right-color: #888;
  border-radius: 22px;
  animation: rotate 1s infinite linear;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoaderContent = styled.div`
  font-weight: 500;
  padding: 15px;
`;

const Loader = ({ content }) => {
  return (
    <LoaderStyled>
      <LoaderIcon />
      {content && <LoaderContent>{content}</LoaderContent>}
    </LoaderStyled>
  );
};

export default Loader;
