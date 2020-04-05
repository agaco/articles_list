import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row } from 'antd';
import Article from 'components/Article';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin } from 'antd';
import * as q from '../../../utils/queries';
import * as actionCreator from '../../../store/actions/creators';

const GET_ARTICLES_LIST = gql`${q.fullListQuery()}`;

function ArticlesList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.list);
  const { data, loading, error } = useQuery(GET_ARTICLES_LIST);


  useEffect(() => {
    data && actionCreator.saga.getArticlesSaga(dispatch, data.articles);
  }, [data]);


  console.log('ARTICLE', articles);

  const onClick = (val) => {
    history.push(`/article/${val}`);
  };

  if (error) return <p>Error</p>;
  return (
    <Spin spinning={loading} size='small'>
      <Row type='flex'
        justify='center'
      >
        {
          !loading && articles && articles.map(item => {
            return (
              <Article key={item.id}
                onClick={() => onClick(item.url)}
                {...item}/>
            );
          })
        }
      </Row>
    </Spin>
  );
}
export default ArticlesList;
