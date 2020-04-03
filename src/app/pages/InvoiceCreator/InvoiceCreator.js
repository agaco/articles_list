import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Row, Col } from 'antd';
import InvoiceForm from 'components/InvoiceCreator/InvoiceForm';
import Article from 'components/Article';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin } from 'antd';

const GET_ARTICLES_LIST = gql`{
  articles(t: Article, limit: 20) {
    id
    title
    url
    tags
    img {
      url
      title
    }
    author {
      img
      name
    }
    body(t: Plain) {
      data
      params {
        id
        type
        description
      }
    }
  }
}`;

function InvoiceCreator() {
  const { data, loading, error } = useQuery(GET_ARTICLES_LIST);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;



  console.log('DATA', data);
  console.log('loading', loading);

  return (
    <Spin spinning={loading} size='small'>
      <Row type='flex'
        justify='center'
      >
        {
          !loading && data && data.articles.map(item => {
            return (
              <Article key={item.id} {...item}/>
            );
          })
        }
      </Row>
    </Spin>
  );
}
export default InvoiceCreator;
