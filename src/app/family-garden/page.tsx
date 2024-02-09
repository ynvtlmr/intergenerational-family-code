"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, Container, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FamilyGarden = () => {
  const [growthRate, setGrowthRate] = useState(0.05);
  const [people, setPeople] = useState([
    { id: 1, name: '', beginAmount: '', beginAge: 30 },
    { id: 2, name: '', beginAmount: '', beginAge: 60 },
  ]);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleGrowthRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    const roundedRate = Math.round(rate * 100) / 100;
    setGrowthRate(roundedRate / 100);
  };

  const formatCurrencyInput = (inputValue) => {
    const numbersOnly = inputValue.replace(/[^0-9]/g, '');
    if (numbersOnly) {
      return `$${parseInt(numbersOnly, 10).toLocaleString()}`;
    }
    return '';
  };

  const handleBeginAmountChange = (id, newAmount) => {
    const formattedAmount = formatCurrencyInput(newAmount);
    setPeople(prev => prev.map(person => person.id === id ? { ...person, beginAmount: formattedAmount } : person));
  };

  const handleNameChange = (id, newName) => {
    setPeople(prev => prev.map(person => person.id === id ? { ...person, name: newName } : person));
  };

  const handleBeginAgeChange = (id, newAge) => {
    const age = parseInt(newAge, 10);
    const validAge = !isNaN(age) ? age : '';
    setPeople(prev => prev.map(person => person.id === id ? { ...person, beginAge: parseInt(validAge.toString(), 10) } : person));
  };

  const addNewPerson = () => {
    const newId = people.length > 0 ? people[people.length - 1].id + 1 : 1;
    setPeople([...people, { id: newId, name: '', beginAmount: '', beginAge: 0 }]);
  };

  const handleDeletePerson = (id) => {
    setPeople(prevPeople => prevPeople.filter(person => person.id !== id));
  };

  const calculateGrowth = (initialAmount, years) => {
    const amount = parseFloat(initialAmount.replace(/[$,]/g, '')) || 0;
    return `$${(amount * Math.pow(1 + growthRate, years)).toFixed(2)}`;
  };

  const calculateTaxCoverage = (growthAmount) => {
    const amount = parseFloat(growthAmount.replace(/[$,]/g, ''));
    const tax = amount * 0.25;
    return `$${tax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const generateAges = (beginAge) => {
    const ages:number[] = [];
    for (let age = beginAge; age <= 120; age += 10) {
      ages.push(age);
    }
    return ages;
  };

  const yearsSinceBegin = (age, beginAge) => age - beginAge;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Family Garden
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The more powerful the seed the longer it takes to germinate
      </Typography>

      <Box my={4}>
        <TextField
          id="growthRate"
          label="Growth Rate (%)"
          type="number"
          variant="outlined"
          fullWidth
          value={(growthRate * 100).toString()}
          onChange={handleGrowthRateChange}
          margin="normal"
        />
      </Box>

      {people.map((person, index) => (
        <Card key={person.id} variant="outlined" sx={{ mb: 5, position: 'relative' }}>
          <CardContent>
            <TextField
              label={`Person ${index + 1}'s Name`}
              variant="outlined"
              fullWidth
              value={person.name}
              onChange={(e) => handleNameChange(person.id, e.target.value)}
              margin="normal"
            />
            <TextField
              label={`Person ${index + 1}'s Begin Age`}
              type="number"
              variant="outlined"
              fullWidth
              value={person.beginAge || ''}
              onChange={(e) => handleBeginAgeChange(person.id, e.target.value)}
              margin="normal"
            />
            <TextField
              label="Begin Amount"
              variant="outlined"
              fullWidth
              value={person.beginAmount}
              onChange={(e) => handleBeginAmountChange(person.id, e.target.value)}
              margin="normal"
            />
            {generateAges(person.beginAge).map((age) => (
              <Box key={`${person.id}-${age}`} display="flex" justifyContent="space-between" my={3}>
                <Typography>Age: {age}</Typography>
                <Typography>Net Worth Growth: {calculateGrowth(person.beginAmount, yearsSinceBegin(age, person.beginAge))}</Typography>
                <Typography>Target Tax Coverage(25%): {calculateTaxCoverage(calculateGrowth(person.beginAmount, yearsSinceBegin(age, person.beginAge)))}</Typography>
              </Box>
            ))}
          </CardContent>
          <Box sx={{ position: 'absolute', top: -5, right: -5 }}>
            <IconButton onClick={() => handleDeletePerson(person.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={addNewPerson}
        sx={{
          mt: 3,
          ':hover': {
            backgroundColor: 'secondary.main',
            transform: 'scale(1.15)',
            transition: 'transform 0.2s ease-in-out',
          },
        }}
      >
        Add Person
      </Button>
    </Container>
  );
};

export default FamilyGarden;
