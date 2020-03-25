import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { Wrapper } from './styled';

const { Item } = Form;
const validationMsg = 'Please fill required field!';

const AddressComponent = ({ type }) => {
  return (
    <Wrapper>
      <Item
        label='Company'
        name={`${type}_name`}
        rules={[
          {
            required: true,
            message: validationMsg,
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label='NIP'
        name={`${type}_nip`}
        rules={[
          {
            required: true,
            message: validationMsg,
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label='Address line 1'
        name={`${type}_address_01`}
        rules={[
          {
            required: true,
            message: validationMsg,
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label='Address line 2'
        name={`${type}_address_02`}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Item>

    </Wrapper>

  );
};

AddressComponent.propTypes = {
  type: PropTypes.string,
};


export default AddressComponent;
