import React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from 'antd';
import { Container, Wrapper, Sum, Label } from './styled';

const ServiceComponent = ({ value, quantity, description, onChange }) => {

  const onValueChange = (type, e) => {
    const value = e.target.value == '' ? e.target.value.toFixed(2) : 0;

    const data = {
      type,
      value: parseFloat(value),
    };

    onChange(data);
  };

  const sum = quantity * value;
  return (
    <Container>
      <Wrapper grow='5'>
        <Label>
          description:
        </Label>
        <Input defaultValue={description}
          // onChange={(e) => onValueChange('description', e)}/>
          onChange={(e) => onChange({type: 'description', 'value': e.target.value})}/>
      </Wrapper>
      <Wrapper grow='0'>
        <Label>
          Value:
        </Label>
        <Input defaultValue={value}
          type='number'
          onChange={(e) => onChange({type: 'value', 'value': e.target.value})}/>
      </Wrapper>

      <Wrapper grow='0'>
        <Label>
          Quantity:
        </Label>
        <Input defaultValue={quantity}
          type='number'
          onChange={(e) => onChange({type: 'quantity', 'value': e.target.value})}/>
      </Wrapper>

      <Wrapper grow='3'>
        <Label>
          Total:
        </Label>
        <Sum>
          { sum.toFixed() }
        </Sum>
      </Wrapper>



    </Container>

  );
};

ServiceComponent.propTypes = {
  quantity: PropTypes.number,
  value: PropTypes.number,
  description: PropTypes.string,
  onChange: PropTypes.func,
};


export default ServiceComponent;
