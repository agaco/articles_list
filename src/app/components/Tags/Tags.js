import React from 'react';
import * as PropTypes from 'prop-types';
import { Tag } from 'antd';
import { Wrapper} from './styled';

const Tags = ({
  onClick,
  data,
}) => {

  return (
    <Wrapper>
      {
        Array.isArray(data) && data.map((item, index) => {
          const name = item.toLowerCase();
          return (
            <Tag key={index}
              color='cyan'
              onClick={() => onClick.call(this, item)}
            >
              { name }
            </Tag>
          );
        })
      }
    </Wrapper>
  );
};

Tags.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
};


export default Tags;
