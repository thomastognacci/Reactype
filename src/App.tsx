import React from 'react';
import theme from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'
import styled, { ThemeProvider } from 'styled-components';

import Screen from './components/Screen/Screen';

const AppContainer = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.purple};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Screen />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
