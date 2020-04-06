import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spin, Divider } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Image from 'components/Image';
import Tags from 'components/Tags';
import { Article, Section } from './styled';

import gql from 'graphql-tag';
import * as q from '../../../utils/queries';
import * as actionCreator from '../../../store/actions/creators';
import * as selector from '../../../store/selectors';

const GET_ARTICLE_DATA = gql`${q.singleArtQuery}`;
const GET_ARTICLES_LIST = gql`${q.fullListQuery}`;


function SingleArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const articlesOriginalId = id.split('-id-').pop();
  const articles = useSelector(state => selector.getArticles(state));

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

  useEffect(() => {
    singleArticle && actionCreator.saga.getRecommendations(dispatch, singleArticle.tags);
  }, [singleArticle]);

  const tagOnCLick = (item) => {
    console.log('click', item);
  };


  if (!data && articleLoading || articlesListLoading) return <Spin spinning={articleLoading || articlesListLoading} size='small'/>;
  if (!data && articleError || articlesListError) return <div>There are some errors</div>;

  return (
    <Spin spinning={articleLoading || articlesListLoading} size='small'>
      <Row gutter={[24, 24]}>
        {
          data && (
            <Col span={24}>
              <Article>
                <h1> { data.article.title } </h1>
                <Tags onClick={tagOnCLick} data={data.article.tags}/>
                <Image url={data.article.img.url} title={data.article.img.title}/>
                <Divider/>
                <Section>
                  {
                    data.article.body.map((item, index) => {
                      const id = `${data.article.id}-${index}`;
                      return (
                        <div key={id} dangerouslySetInnerHTML={{__html: item.data}} />
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
