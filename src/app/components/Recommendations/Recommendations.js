import React from 'react';
import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Wrapper, Tile, Title } from './styled';
import Image from '../Image';


function Recommendations({data}) {
  const history = useHistory();

  const onClick = (val) => {
    history.push(`/article/${val}`);
  };

  const dimension = {
    height: '200px',
  };

  const list = data.slice(0,3);

  return (
    <Wrapper>
      <Title>
        Przeczytaj też:
      </Title>
      {
        list && list.map(item => {
          return (
            <Tile key={item.id} onClick={() => onClick(item.friendly_url)}>
              <Image url={item.img.url} title={item.img.title} {...dimension}/>
            </Tile>
          );
        })
      }
    </Wrapper>
  );
}

Recommendations.propTypes = {
  data: PropTypes.array,
};

export default Recommendations;
