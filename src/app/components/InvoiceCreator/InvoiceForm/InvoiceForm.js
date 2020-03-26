import React, { useReducer } from 'react';
import { Button, Row, Col, Divider } from 'antd';
import ServiceComponent from '../ServiceComponent';
import AddressComponent from '../AddressComponent';
import Total from '../Total';
import * as constant from '../../../../constants';
import { Container } from './styled';



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
    <Container>
      <Row>
        {
          console.log('stte', state)
        }
        <Col span={12}>
          <AddressComponent onSubmit={setSellerAddress}/>
        </Col>
        <Col>
          <Divider dashed />
        </Col>
        <Col span={12}>
          <AddressComponent onSubmit={setConcractorAddress}/>
        </Col>

        <Col span={20}>
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
        </Col>
        <Col>
          <Divider dashed />
        </Col>
        <Col span={12} offset={3}>
          <Total data={state.services}/>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoiceForm;
