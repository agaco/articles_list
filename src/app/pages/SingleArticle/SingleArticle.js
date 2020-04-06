import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tag, Spin } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Image from 'components/Image';
import { Article, Section } from './styled';

import gql from 'graphql-tag';
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

  const { data, loading: articleLoading, error: articleError } = useQuery(GET_ARTICLE_DATA, {
    skip: !singleArticle.url,
    variables: { url: singleArticle.url},
  });

  console.log('article', data);


  if (!data && articleLoading || articlesListLoading) return <Spin spinning={articleLoading || articlesListLoading} size='small'/>;
  if (!data && articleError || articlesListError) return <div>There are some errors</div>;

  return (
    <Spin spinning={articleLoading || articlesListLoading} size='small'>
      <Row type='flex'
        justify='center'
      >
        {
          data && (
            <Col span={12} style={{margin: '10px'}}>
              <Article>
                <h1> { data.article.title } </h1>
                {
                  data.article.tags.map((item, index) => (
                    <Tag key={index}>
                      { item }
                    </Tag>
                  ))
                }
                <Image url={data.article.img.url} title={data.article.img.title}/>
                <Section>
                  {
                    data.article.body.map(item => {
                      return (
                        <div key={data.article.id} dangerouslySetInnerHTML={{__html: item.data}} />
                      );
                    })
                  }
                </Section>
              </Article>
            </Col>
          )
        }

      </Row>
    </Spin>
  );
}
export default SingleArticle;
