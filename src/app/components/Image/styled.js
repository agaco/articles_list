import styled from 'styled-components';
export const Title = styled.div`
  padding: 10px;
  font-size: 15px;
  line-height: 1.3;
`;

export const Img = styled.div`
  height: ${props => props.height ? props.height : '300px'};  
  width: ${props => props.width ? props.width : '100%'};
  background: url(${(props) => props.src}) center center;
  background-size: cover;
  background-position: top center;
`;

