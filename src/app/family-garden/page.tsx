"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FamilyGarden = () => {
  const [growthRate, setGrowthRate] = useState(0.05);
  const [people, setPeople] = useState([
    { id: 1, name: '', beginAmount: '', beginAge: 30 },
    { id: 2, name: '', beginAmount: '', beginAge: 60 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleGrowthRateChange = (e) => {
    const rate = parseFloat(e.target.value) / 100;
    setGrowthRate(rate);
  };

  const formatCurrencyInput = (inputValue) => {
    const numbersOnly = inputValue.replace(/[^0-9]/g, '');
    return numbersOnly ? `$${parseInt(numbersOnly, 10).toLocaleString()}` : '';
  };

  const handleBeginAmountChange = (id, newAmount) => {
    const numbersOnly = newAmount.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(numbersOnly);
    if (!isNaN(numericValue) && numericValue < Number.MAX_SAFE_INTEGER) {
      const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0,
      }).format(numericValue);
  
      setPeople(prev => prev.map(person => person.id === id ? { ...person, beginAmount: formattedAmount } : person));
    } else {
      setPeople(prev => prev.map(person => person.id === id ? { ...person, beginAmount: '' } : person));
    }
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
    setPeople([...people, { id: newId, name: '', beginAmount: '', beginAge: 30 }]);
  };

  const handleDialogOpen = (personId) => {
    setOpenDialog(true);
    setPersonToDelete(personId);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    if (personToDelete !== null) {
      setPeople(prevPeople => prevPeople.filter(person => person.id !== personToDelete));
      handleDialogClose();
    }
  };

  const calculateGrowth = (initialAmount, years) => {
    const amount = parseFloat(initialAmount.replace(/[$,]/g, '')) || 0;
    return `$${(amount * Math.pow(1 + growthRate, years)).toFixed(2)}`;
  };

  const calculateTaxCoverage = (growthAmount) => {
    const amount = parseFloat(growthAmount.replace(/[$,]/g, ''));
    const tax = amount * 0.25;
    return `$${tax.toFixed(2)}`;
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
      <Typography variant="h4" component="h1" gutterBottom>Family Garden</Typography>
      <Typography variant="subtitle1" gutterBottom>The more powerful the seed the longer it takes to germinate</Typography>
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
              value={person.beginAge.toString()}
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
                InputProps={{
                  style: { textAlign: 'right' },
                  }}
                />
            {generateAges(person.beginAge).map(age => (
              <Box key={`${person.id}-${age}`} display="flex" justifyContent="space-between" my={3}>
                <Typography>Age: {age}</Typography>
                <Typography>Net Worth Growth: {calculateGrowth(person.beginAmount, yearsSinceBegin(age, person.beginAge))}</Typography>
                <Typography>Target Tax (25%): {calculateTaxCoverage(calculateGrowth(person.beginAmount, yearsSinceBegin(age, person.beginAge)))}</Typography>
              </Box>
            ))}
          </CardContent>
          <Box sx={{ position: 'absolute', top: -5, right: -5 }}>
            <IconButton onClick={() => handleDialogOpen(person.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={addNewPerson} sx={{ mt: 3 }}>
        Add Person
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this person? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FamilyGarden;
