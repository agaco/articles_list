import React from 'react';
import * as PropTypes from 'prop-types';
import { Card, Col } from 'antd';
import { Container, Wrapper, Sum, Image } from './styled';

const { Meta } = Card;

const Article = ({
  title,
  img,
  body,
}) => {
  return (
    <Col span={8} style={{margin: '10px'}}>
      <Card hoverable
        cover={
          <Image alt={img.title}
            src={img.url}
          />
        }
      >
        <Meta
          title={title}
          // description={body.data}
        />
      </Card>
    </Col>
  );
};

Article.propTypes = {
  title: PropTypes.string,
  img: PropTypes.object,
  body: PropTypes.object,
  // onChange: PropTypes.func,
};


export default Article;
