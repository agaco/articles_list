import styled from 'styled-components';
import { Card as CommonCard } from 'antd';

export const Title = styled.div`
  padding: 10px;
  font-size: 15px;
  line-height: 1.3;
`;

export const Card = styled(CommonCard)`
  height: 100%;
`;

export const Image = styled.div`
  height:200px;
  width: 100%;
  background: url(${(props)=>props.src}) center center;
  background-size: cover;
  background-position: top center;
`;

