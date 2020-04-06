import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Wrapper, HeaderContainer, Return } from './styled';


function Header() {
  const history = useHistory();
  const location = useLocation();


  console.log('location', location);
  console.log('history', history);
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Wrapper>
          <HeaderContainer>
            {
              location.pathname !== '/' && <Return onClick={() => history.goBack()}>return</Return>
            }
          </HeaderContainer>
        </Wrapper>
      </Col>
    </Row>
  );
}
export default Header;
