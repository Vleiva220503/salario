import React from 'react';
import { ChakraProvider, CSSReset, Container } from '@chakra-ui/react';
import SalaryCalculator from './SalaryCalculator';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Container maxW="xl" centerContent>
        <SalaryCalculator />
      </Container>
    </ChakraProvider>
  );
}

export default App;
