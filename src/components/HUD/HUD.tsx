import React, { useContext } from 'react';
import styled from 'styled-components';
import Key from '../Game/Key';
import { GameContext } from '../../context/context';

interface Props {

}

const HUDContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 2em;
  justify-content: center;
`;

const KeyContainer = styled.div`
  margin-right: 1rem;
`;

const HUD: React.FC<Props> = () => {
  const { store } = useContext(GameContext);

  const renderKeys = () : JSX.Element[] => {
    const { letters, history } = store;
    
    const listOfKeys = letters.map((letter, index) => {
    const solved = history[index] || undefined;
      return (
      <KeyContainer>
        <Key key={letter} small solved={solved}/>
      </KeyContainer>
      )
    })
    return listOfKeys
  }
  return (
    <HUDContainer>
      { renderKeys() }
    </HUDContainer>
  );
};

export default HUD;