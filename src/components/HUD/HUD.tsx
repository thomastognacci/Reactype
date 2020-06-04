import React, { useContext } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Key from '../Game/Key';
import { GameContext } from '../../context/context';

interface Props {}

const HUDContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 2em;
  justify-content: center;
`;

const HUD: React.FC<Props> = () => {
  const { store } = useContext(GameContext);
  const { currentIndex } = store;

  const renderKeys = (): JSX.Element[] => {
    const { letters, history } = store;
    const tryingToGenerateThatUniqueKey = letters.reduce((prev, curr) => {
      return `${prev}-${curr}`;
    });

    const listOfKeys = letters.map((letter, index) => {
      const solved = history[index] || undefined;
      return (
        <CSSTransition
          appear
          in
          timeout={50 * index}
          classNames="hud-keys"
          key={`${tryingToGenerateThatUniqueKey}-${letter}-${index}`}
        >
          <Key small solved={solved} />
        </CSSTransition>
      );
    });
    return listOfKeys;
  };
  return <HUDContainer>{currentIndex > -1 && renderKeys()}</HUDContainer>;
};

export default HUD;
