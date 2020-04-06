import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Img, Title } from './styled';

const placeholder = 'https://via.placeholder.com/300';
const Image = ({
  title,
  url,
  ...props
}) => {
  return (
    <Fragment>
      <Img alt={title ? title : ''}
        src={url ? url : placeholder}
        {...props}
      />
      {
        title && (
          <Title>
            { title }
          </Title>
        )
      }
    </Fragment>
  );
};

Image.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  props: PropTypes.any,
};


export default Image;
