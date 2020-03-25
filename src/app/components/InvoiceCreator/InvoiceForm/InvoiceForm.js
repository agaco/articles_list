import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddressComponent from '../AddressComponent';
import ServiceComponent from '../ServiceComponent';
import { Wrapper } from './styled';


const InvoiceForm = () => {

  const initialService = {
    id: null,
    value: 0,
    quantity: 1,
    description: 'xxxx',
    total: 0,
  };

  const [services, setService] = useState([]);

  const addService = async () => {
    const item = {...initialService};
    item.id = services.length + 1;
    await setService([...services, item]);
  };

  const setServiceItemEdit = async (item, id) => {
    const copyServices = [...services];
    let editedItem = await copyServices.find(item => item.id == id);
    const val = item.value == '' ? 0 : parseFloat(item.value);

    if (editedItem) {
      await (editedItem[item.type] = item.type == 'description' ? item.value : val);
      await (editedItem.total = (editedItem.value * editedItem.quantity));
      await setService(copyServices);
    }

  };


  return (
    <Wrapper>
      <Button onClick={addService}>
      Add Service
      </Button>
      {
        services.map((item, index) => {
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
