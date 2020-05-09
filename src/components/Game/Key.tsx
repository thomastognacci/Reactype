import React from 'react';
import styled from 'styled-components';

interface Props {
  char: string;
  progress?: number | undefined;
}

const Container = styled.div<{ progress: number | undefined }>`
  position: relative;
  display: flex;
  font-size: 3rem;
  border-radius: 4px;
  width: 6rem;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  background-color: white;
  color: ${({ theme }) => theme.colors.purple};
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22),
    -5px -5px 0 rgba(0, 0, 0, 0.22) inset;

  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #00000040;
    transform: ${({ progress }) => (progress ? `scaleY(${1 - progress})` : 'scaleY(0)')};
  }
`;

const KeyBoardKey = styled.div`
  position: relative;
  z-index: 1;
`;

const Key: React.FC<Props> = ({ char, progress }) => {
  console.log(progress);

  return (
    <Container progress={progress}>
      <KeyBoardKey>{char}</KeyBoardKey>
    </Container>
  );
};

export default Key;
