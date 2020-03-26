import React, { useState, useReducer } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import ServiceComponent from '../ServiceComponent';
import AddressComponent from '../AddressComponent';
import * as constant from '../../../../constants';
import { Wrapper } from './styled';



const invoiceReducer = (state, action) => {
  switch (action.type) {
  case 'SET_SELLER_DATA':
    return {
      ...state,
      seller: action.payload,
    };
  case 'SET_CONTRACTOR_DATA':
    return {
      ...state,
      contractor: action.payload,
    };
  case 'ADD_SERVICES_DATA':
    return {
      ...state,
      services: [...state.services, action.payload],
    };
  case 'EDIT_SERVICES_DATA':
    return {
      ...state,
      services: action.payload,
    };
  case 'SET_TAX_DATA':
    return {
      ...state,
      tax: action.payload,
    };
  default:
    return state;
  }
};
const InvoiceForm = () => {

  const [state, dispatch] = useReducer(invoiceReducer, constant.initialReducer);

  const addService = () => {
    const item = {...constant.initialService};
    item.id = state.services.length + 1;
    dispatch({
      type: 'ADD_SERVICES_DATA',
      payload: item,
    });
  };

  const setServiceItemEdit = async (item, id) => {
    const services = [...state.services];
    let editedItem = await services.find(item => item.id == id);
    const val = item.value == '' ? 0 : parseFloat(item.value);

    if (editedItem) {
      await (editedItem[item.type] = item.type == 'description' ? item.value : val);
      await dispatch({
        type: 'EDIT_SERVICES_DATA',
        payload: services,
      });
    }
  };

  const setSellerAddress = (data) => {
    dispatch({
      type: 'SET_SELLER_DATA',
      payload: data,
    });
  };
  const setConcractorAddress = (data) => {
    dispatch({
      type: 'SET_CONTRACTOR_DATA',
      payload: data,
    });
  };

  return (
    <Wrapper>
      {
        console.log('stte', state)
      }
      <div>
        <AddressComponent onSubmit={setSellerAddress}/>
      </div>
      <div>
        <AddressComponent onSubmit={setConcractorAddress}/>
      </div>
      <Button onClick={addService}>
      Add Service
      </Button>
      {
        state.services.map((item, index) => {
          return (
            <ServiceComponent key={index}
              keyNumber={item.id}
              onChange={(val) => setServiceItemEdit(val, item.id,)}
              {...item}/>
          );
        })
      }
    </Wrapper>
  );
};

export default InvoiceForm;
