import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Row, Col } from 'antd';
import Article from 'components/Article';
import { useQuery } from '@apollo/react-hooks';
import { useParams, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { Spin } from 'antd';
import * as q from '../../../utils/queries';

const xxx = 'https://pawelzieminski.fotoblogia.pl/15229,jak-drukowac-z-telefonu-kilka-cennych-wskazowek-dla-poczatkujacych';
const GET_ARTICLES_LIST = gql`${q.singleArtQuery}`;



function SingleArticle() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ARTICLES_LIST, {
    variables: { url: xxx},
  });

  console.log('DATA', data);
  console.log('loading', loading);
  console.log('param', id);

  return (
    <Spin spinning={loading} size='small'>
      <Row type='flex'
        justify='center'
      >
      </Row>
    </Spin>
  );
}
export default SingleArticle;
