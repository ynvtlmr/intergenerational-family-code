"use client";

import React, { useEffect, useState } from 'react';

const FamilyGarden = () => {
  const [growthRate,setGrowthRate] = useState(0.05);
  const [firstPerson, setFirstPerson] = useState({
    name: 'First Person Name',
    beginAmount: '',
    beginAge: 36,
  });
  const [secondPerson, setSecondPerson] = useState({
    name: 'Second Person Name',
    beginAmount: '',
    beginAge: 60,
  });

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleGrowthRateChange = (newRate: string) => {
    const rate = parseFloat(newRate) / 100;
    setGrowthRate(rate);
  };

  const formatCurrencyInput = (inputValue: string) => {
    const numbersOnly = inputValue.replace(/[^0-9]/g, '');
    if (numbersOnly) {
      return `$${parseInt(numbersOnly, 10).toLocaleString()}`;
    }
    return '';
  };

  const handleBeginAmountChange = (isSecondPerson: boolean, newAmount: string) => {
    const formattedAmount = formatCurrencyInput(newAmount);
    if (isSecondPerson) {
      setSecondPerson((prev) => ({ ...prev, beginAmount: formattedAmount }));
    } else {
      setFirstPerson((prev) => ({ ...prev, beginAmount: formattedAmount }));
    }
  };

  const handleNameChange = (isSecondPerson: boolean, newName: string) => {
    const setter = isSecondPerson ? setSecondPerson : setFirstPerson;
    setter((prev) => ({ ...prev, name: newName }));
  };

  const handleBeginAgeChange = (isSecondPerson: boolean, newAge: string) => {
    const age = parseInt(newAge, 10);
    const validAge = !isNaN(age) ? age : '';
    const setter = isSecondPerson ? setSecondPerson : setFirstPerson;
    setter((prev) => ({ ...prev, beginAge: parseInt(validAge.toString(), 10) }));
  };

  const calculateGrowth = (initialAmount: string, years: number) => {
    const amount = parseFloat(initialAmount.replace(/[$,]/g, '')) || 0;
    return `$${(amount * Math.pow(1 + growthRate, years)).toFixed(2)}`;
  };

  const calculateTaxCoverage = (growthAmount: string) => {
    const amount = parseFloat(growthAmount.replace(/[$,]/g, '')) || 0;
    return formatCurrencyInput((amount * 0.25).toString());
  };

  const generateAges = (beginAge: number) => {
    const ages = [];
    for (let age = beginAge; age <= 120; age += 10) {
      ages.push(age);
    }
    return ages;
  };

  const yearsSinceBegin = (age: number, beginAge: number) => age - beginAge;

  return (
    <div className="bg-white p-8">
      <div className="font-serif text-4xl text-gray-700">Family Garden</div>
      <div className="italic text-gray-500 my-2">
        The more powerful the seed the longer it takes to germinate
      </div>
  
      <div className="my-4">
        <label htmlFor="growthRate" className="block text-gray-700 text-sm font-bold mb-2">
          Growth Rate (%):
        </label>
        <input
          id="growthRate"
          type="number"
          placeholder="Enter Growth Rate in %"
          className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(growthRate * 100).toString()}
          onChange={(e) => handleGrowthRateChange(e.target.value)}
        />
      </div>
  
      <div className="flex flex-col lg:flex-row justify-between mt-8">
        <div className="lg:w-1/2">
          <input
            type="text"
            placeholder="Enter First Person's Name"
            className="border-2 border-gray-200 rounded p-1 text-left my-2"
            value={firstPerson.name}
            onChange={(e) => handleNameChange(false, e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter First Person's Begin Age"
            className="border-2 border-gray-200 rounded p-1 my-2"
            value={firstPerson.beginAge || ''}
            onChange={(e) => handleBeginAgeChange(false, e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Begin Amount"
            className="border-2 border-gray-200 rounded p-1 pl-3 text-right my-2"
            value={firstPerson.beginAmount}
            onChange={(e) => handleBeginAmountChange(false, e.target.value)}
          />
          <div>
            {generateAges(firstPerson.beginAge).map((age) => (
              <div key={`first-${age}`} className="flex justify-between mb-6">
                <div>Age: {age}</div>
                <div>Growth: {calculateGrowth(firstPerson.beginAmount, yearsSinceBegin(age, firstPerson.beginAge))}</div>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter Second Person's Name"
            className="border-2 border-gray-200 rounded p-1 text-left my-2"
            value={secondPerson.name}
            onChange={(e) => handleNameChange(true, e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Second Person's Begin Age"
            className="border-2 border-gray-200 rounded p-1 my-2"
            value={secondPerson.beginAge || ''}
            onChange={(e) => handleBeginAgeChange(true, e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Begin Amount"
            className="border-2 border-gray-200 rounded p-1 pl-3 text-right my-2"
            value={secondPerson.beginAmount}
            onChange={(e) => handleBeginAmountChange(true, e.target.value)}
          />
          <div>
            {generateAges(secondPerson.beginAge).map((age) => (
              <div key={`second-${age}`} className="flex justify-between mb-6">
                <div>Age: {age}</div>
                <div>Growth: {calculateGrowth(secondPerson.beginAmount, yearsSinceBegin(age, secondPerson.beginAge))}</div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="lg:w-1/2 lg:ml-10 mt-8 lg:mt-0">
          <div className="font-bold text-gray-800 mb-7">Target Tax Coverage(25%) for {firstPerson.name}</div>
          {generateAges(firstPerson.beginAge).map((age) => (
            <div key={`tax-first-${age}`} className="mb-6">
              <div>Tax: {calculateTaxCoverage(calculateGrowth(firstPerson.beginAmount, yearsSinceBegin(age, firstPerson.beginAge)))}</div>
            </div>
          ))}
          <div className="font-bold text-gray-800 mb-7">Target Tax Coverage(25%) for {secondPerson.name}</div>
          {generateAges(secondPerson.beginAge).map((age) => (
            <div key={`tax-second-${age}`} className="mb-6">
              <div>Tax: {calculateTaxCoverage(calculateGrowth(secondPerson.beginAmount, yearsSinceBegin(age, secondPerson.beginAge)))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default FamilyGarden;