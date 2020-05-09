import React from 'react';
import styled from 'styled-components';

import Game from '../Game/Game';

const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Screen: React.FC = () => {
  return (
    <ScreenContainer>
      {/* <Menu /> */}
      <Game />
      {/* <HUD /> */}
    </ScreenContainer>
  );
};

export default Screen;
