import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Row, Col } from 'antd';
import InvoiceForm from 'components/InvoiceCreator/InvoiceForm';


function InvoiceCreator() {
  // const newsStore = useSelector(state => state.news.sources);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: news.GET_SOURCES_REQUEST,
  //   });
  //
  // }, [dispatch]);

  return (
    <Row type='flex'
      justify='center'
    >
      <Col span={18}>
        <InvoiceForm/>
      </Col>

    </Row>
  );
}
export default InvoiceCreator;
