import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { Wrapper } from './styled';

const { Item } = Form;
const validationMsg = 'Please fill required field!';

const AddressComponent = ({ onSubmit, type }) => {
  return (
    <Form
      name={`${type}_address`}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Wrapper>
        <Item
          label='Company'
          name='name'
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
          name='nip'
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
          name='address_01'
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
          name='address_02'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Item>
        <Item>
          <Button type='primary' htmlType='submit'>
            Confirm
          </Button>
        </Item>
      </Wrapper>
    </Form>


  );
};

AddressComponent.propTypes = {
  onSubmit: PropTypes.func,
  type: PropTypes.string,
};


export default AddressComponent;
