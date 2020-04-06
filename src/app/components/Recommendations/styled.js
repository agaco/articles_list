import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 60px;
  box-shadow: rgba(0,0,0,0.2) 0 2px 6px 1px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 30px 0;
  @media (max-width: 768px) {
   flex-direction: column;
   min-height: 0;
  }
  
`;

export const Tile = styled.div`
  width: 30%;
  font-size: 13px;
  cursor: pointer;
  padding: 5px;
  justify-content: space-between;
  @media (max-width: 768px) {
   width: 100%;
  }
`;


export const Title = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 17px;
  padding: 5px;
  justify-content: space-between;
`;

