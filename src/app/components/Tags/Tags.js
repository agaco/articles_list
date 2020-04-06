import React from 'react';
import * as PropTypes from 'prop-types';
import { Col, Tag } from 'antd';
import { Card, Image, Title } from './styled';

const Tags = ({
  title,
  img,
  onClick,
}) => {
  return (
    <Col span={8} style={{margin: '10px'}}>
      <Card hoverable
        onClick={onClick}
        cover={
          <Image alt={img ? img.title : ''}
            src={img ? img.url : placeholder}
          />
        }
      >
        <Title>
          {title}
        </Title>
      </Card>
    </Col>
  );
};

Tags.propTypes = {
  title: PropTypes.string,
  img: PropTypes.object,
  onClick: PropTypes.func,
};


export default Tags;
