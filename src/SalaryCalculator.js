import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const SalaryCalculator = () => {
  const [personCount, setPersonCount] = useState();
  const [currentPerson, setCurrentPerson] = useState(0);
  const [salaries, setSalaries] = useState(Array.from({ length: personCount }, () => ''));
  const [inssArray, setINSSArray] = useState(Array.from({ length: personCount }, () => 0));
  const [irArray, setIRArray] = useState(Array.from({ length: personCount }, () => 0));
  const [isSalaryInvalid, setIsSalaryInvalid] = useState(false);

  const validateInput = (value, minValue, maxValue) => parseFloat(value) >= minValue && parseFloat(value) <= maxValue;

  const handlePersonCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (validateInput(count, 3, 24)) { // Change the maximum value here
      setPersonCount(count);
      setCurrentPerson(0);
      setSalaries(Array.from({ length: count }, () => ''));
      setINSSArray(Array.from({ length: count }, () => 0));
      setIRArray(Array.from({ length: count }, () => 0));
      setIsSalaryInvalid(false);
    } else {
      setIsSalaryInvalid(true);
    }
  };

  const handleSalaryChange = (value) => {
    const newSalaries = [...salaries];
    newSalaries[currentPerson] = value;

    const isInvalid = !validateInput(value, 6000, 360000);
    setIsSalaryInvalid(isInvalid);

    setSalaries(newSalaries);
  };

  const calculateSalary = () => {
    const parsedSalary = parseFloat(salaries[currentPerson]);

    if (!isNaN(parsedSalary)) {
      const calculatedINSS = parsedSalary * 0.07;
      const calculatedIR = (parsedSalary - calculatedINSS) * 0.12;

      const newINSSArray = [...inssArray];
      const newIRArray = [...irArray];
      newINSSArray[currentPerson] = calculatedINSS.toFixed(2);
      newIRArray[currentPerson] = calculatedIR.toFixed(2);

      setINSSArray(newINSSArray);
      setIRArray(newIRArray);

      if (currentPerson < personCount - 1) {
        setCurrentPerson(currentPerson + 1);
      }
    }
  };

  const calculateNetSalary = (index) => (parseFloat(salaries[index]) - inssArray[index] - irArray[index]).toFixed(2);

  const handleClearScreen = () => {
    setPersonCount(); // Reset personCount here
    setSalaries(Array.from({ length: personCount }, () => ''));
    setINSSArray(Array.from({ length: personCount }, () => 0));
    setIRArray(Array.from({ length: personCount }, () => 0));
    setCurrentPerson(0);
    setIsSalaryInvalid(false);
  };

  return (
    <VStack spacing={4} align="stretch" maxW="800px" m="auto">
      <FormControl>
        <FormLabel>Cantidad de personas (3-25):</FormLabel>
        <Input type="number" value={personCount} onChange={handlePersonCountChange} />
      </FormControl>
      {currentPerson < personCount && (
        <Box w="100%">
          <FormControl>
            <FormLabel>Ingrese el salario de la persona {currentPerson + 1}:</FormLabel>
            <Input
              type="number"
              value={salaries[currentPerson]}
              onChange={(e) => handleSalaryChange(e.target.value)}
              isInvalid={isSalaryInvalid}
            />
          </FormControl>
          {isSalaryInvalid && <Text color="red">El salario debe estar entre 6000 y 360000</Text>}
          <Button colorScheme="blue" onClick={calculateSalary} w="100%">
            Siguiente Persona
          </Button>
          {inssArray[currentPerson] > 0 && (
            <Box>
              <Text>INSS: C${inssArray[currentPerson]}</Text>
              <Text>IR: C${irArray[currentPerson]}</Text>
              <Text>Salario Neto: C${calculateNetSalary(currentPerson)}</Text>
            </Box>
          )}
        </Box>
      )}
      {inssArray[0] > 0 && (
        <Box w="100%">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Persona</Th>
                <Th>Salario</Th>
                <Th>INSS</Th>
                <Th>IR</Th>
                <Th>Salario Neto</Th>
                <Th>Editar Salario</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: personCount }).map((_, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>${salaries[index]}</Td>
                  <Td>${inssArray[index]}</Td>
                  <Td>${irArray[index]}</Td>
                  <Td>${calculateNetSalary(index)}</Td>
                  <Td>
                    <Button colorScheme="blue" onClick={() => setCurrentPerson(index)}>
                      Editar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button colorScheme="red" onClick={handleClearScreen} w="100%">
            Limpiar Pantalla
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default SalaryCalculator;
