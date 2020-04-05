import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tag } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { Spin } from 'antd';
import * as q from '../../../utils/queries';
import * as actionCreator from '../../../store/actions/creators';

const GET_ARTICLE_DATA = gql`${q.singleArtQuery}`;
const GET_ARTICLES_LIST = gql`${q.fullListQuery}`;


function SingleArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const articlesOriginalId = id.split('-id-').pop();
  const articles = useSelector(state => state.articles.list);

  const { data: articlesList, loading: articlesListLoading, error: articlesListError } = useQuery(GET_ARTICLES_LIST, {
    skip: articles.length > 0,
  });

  useEffect(() => {
    articlesList && actionCreator.saga.getArticlesSaga(dispatch, articlesList.articles);
  }, [articlesList]);

  const singleArticle = articles.length > 0 && articles.find(i => i.original_id == articlesOriginalId);

  const { data, loading: articleLoading, error: errorLoading } = useQuery(GET_ARTICLE_DATA, {
    skip: !singleArticle.url,
    variables: { url: singleArticle.url},
  });

  console.log('article', data);


  if (!data && articleLoading || articlesListLoading) return <Spin spinning={articleLoading || articlesListLoading} size='small'/>;

  return (
    <Spin spinning={articleLoading || articlesListLoading} size='small'>
      <Row type='flex'
        justify='center'
      >
        {
          data && (
            <Col span={8} style={{margin: '10px'}}>
              <h1> { data.article.title } </h1>
              <div>
                {
                  data.article.tags.map((item, index) => (
                    <Tag key={index}>
                      { item }
                    </Tag>
                  ))
                }
              </div>
            </Col>
          )
        }

      </Row>
    </Spin>
  );
}
export default SingleArticle;
