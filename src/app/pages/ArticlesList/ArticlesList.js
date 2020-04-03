import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row } from 'antd';
import Article from 'components/Article';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin } from 'antd';
import * as q from '../../../utils/queries';

const GET_ARTICLES_LIST = gql`${q.fullListQuery()}`;

function ArticlesList() {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_ARTICLES_LIST);

  const onClick = (val) => {
    history.push(`/article/${val}`);
  };

  console.log('DATA', data);
  console.log('loading', loading);
  if (error) return <p>Error</p>;
  return (
    <Spin spinning={loading} size='small'>
      <Row type='flex'
        justify='center'
      >
        {
          !loading && data && data.articles.map(item => {
            return (
              <Article key={item.id}
                onClick={() => onClick(item.original_id)}
                {...item}/>
            );
          })
        }
      </Row>
    </Spin>
  );
}
export default ArticlesList;
