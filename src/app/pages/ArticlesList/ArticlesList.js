import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Row, Col } from 'antd';
import Article from 'components/Article';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin } from 'antd';
import * as q from '../../../utils/queries';

const GET_ARTICLES_LIST = gql`${q.fullListQuery()}`;


function ArticlesList() {

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
export default ArticlesList;
