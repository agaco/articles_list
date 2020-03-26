import React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from 'antd';
import { Container, Wrapper, Sum, Label } from './styled';

const Total = ({data}) => {

  const sumNett = data.reduce((acc, item) => {
    const sum = item.value * item.quantity;
    return acc += sum;
  },0);

  return (
    <Wrapper>
      <p>this is Total</p>
      <p>TOTAL NETT: { sumNett.toFixed(2) }</p>
    </Wrapper>

  );
};

Total.propTypes = {
  data: PropTypes.array,
  // value: PropTypes.number,
  // description: PropTypes.string,
  // onChange: PropTypes.func,
};


export default Total;
