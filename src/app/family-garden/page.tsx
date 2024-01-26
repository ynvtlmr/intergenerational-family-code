"use client";

import React, { useEffect, useState } from 'react';

const FamilyGarden = () => {
  const [growthRate] = useState(0.05); // Assumed growth rate
  const [firstPerson, setFirstPerson] = useState({
    name: 'First Person Name',
    beginAmount: 0,
    beginAge: 36
  });
  const [secondPerson, setSecondPerson] = useState({
    name: 'Second Person Name',
    beginAmount: 0,
    beginAge: 60
  });
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);
  // Function to calculate compound interest
  const calculateGrowth = (initialAmount: string | number, years: number) => {
    const amount = parseFloat(String(initialAmount)) || 0;
    return (amount * Math.pow(1 + growthRate, years)).toFixed(2);
  };

  // Function to calculate target tax coverage
  const calculateTaxCoverage = (amount: string) => {
    const numberAmount = parseFloat(amount) || 0;
    return (numberAmount * 0.25).toFixed(2); // 25% of the amount
  };

  // Handlers for name, beginAmount, and beginAge changes
  const handleNameChange = (isSecondPerson: boolean, newName: string) => {
    if (isSecondPerson) {
      setSecondPerson(prev => ({ ...prev, name: newName }));
    } else {
      setFirstPerson(prev => ({ ...prev, name: newName }));
    }
  };

  const handleBeginAmountChange = (isSecondPerson: boolean, newAmount: string) => {
    const updatedAmount = parseFloat(newAmount) || 0;
    if (isSecondPerson) {
      setSecondPerson(prev => ({ ...prev, beginAmount: updatedAmount }));
    } else {
      setFirstPerson(prev => ({ ...prev, beginAmount: updatedAmount }));
    }
  };

  const handleBeginAgeChange = (isSecondPerson: boolean, newAge: string) => {
    const updatedAge = parseInt(newAge, 10);
    if (!isNaN(updatedAge)) {
      if (isSecondPerson) {
        setSecondPerson(prev => ({ ...prev, beginAge: updatedAge }));
      } else {
        setFirstPerson(prev => ({ ...prev, beginAge: updatedAge }));
      }
    }
  };

  // Function to generate ages array
  const generateAges = (beginAge: number) => {
    const ages = [];
    for (let age = beginAge; age <= 120; age += 10) {
      ages.push(age);
    }
    return ages;
  };

  // Helper to calculate the number of years since the beginning age
  const yearsSinceBegin = (age: number, beginAge: number) => age - beginAge;

  return (
    <div className="bg-white p-8">
      <div className="font-serif text-4xl text-gray-700">
        Family Garden
      </div>
      <div className="italic text-gray-500 my-2">
        The more powerful the seed the longer it takes to germinate
      </div>

      <div className="flex flex-col lg:flex-row justify-between mt-8">
        <div className="lg:w-1/2">
          {/* First Person Section */}
          <input
            type="text"
            placeholder="Enter First Person's Name"
            className="border-2 border-gray-200 rounded p-1 text-right my-2"
            value={firstPerson.name}
            onChange={(e) => handleNameChange(false, e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter First Person's Begin Age"
            className="border-2 border-gray-200 rounded p-1 my-2"
            value={firstPerson.beginAge}
            onChange={(e) => handleBeginAgeChange(false, e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter First Person's Begin Amount"
            className="border-2 border-gray-200 rounded p-1 my-2"
            value={firstPerson.beginAmount}
            onChange={(e) => handleBeginAmountChange(false, e.target.value)}
          />
          {generateAges(firstPerson.beginAge).map((age, index) => (
            <div key={`first-${age}`} className="flex justify-between mb-2">
              <span>Age: {age}</span>
              <span>
                {index === 0
                  ? `${firstPerson.beginAmount}MM`
                  : `$${calculateGrowth(firstPerson.beginAmount, yearsSinceBegin(age, firstPerson.beginAge))}MM`}
              </span>
            </div>
          ))}

          {/* Second Person Section */}
          <input
            type="text"
            placeholder="Enter Second Person's Name"
            className="border-2 border-gray-200 rounded p-1 text-right my-2"
            value={secondPerson.name}
            onChange={(e) => handleNameChange(true, e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Second Person's Begin Age"
            className="border-2 border-gray-200 rounded p-1 my-2"
            value={secondPerson.beginAge}
            onChange={(e) => handleBeginAgeChange(true, e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Second Person's Begin Amount"
            className="border-2 border-gray-200 rounded p-1 my-2"
            value={secondPerson.beginAmount}
            onChange={(e) => handleBeginAmountChange(true, e.target.value)}
          />
          {generateAges(secondPerson.beginAge).map((age, index) => (
            <div key={`second-${age}`} className="flex justify-between mb-3">
              <span>Age: {age}</span>
              <span>
                {index === 0
                  ? `${secondPerson.beginAmount}B*`
                  : `$${calculateGrowth(secondPerson.beginAmount, yearsSinceBegin(age, secondPerson.beginAge))}B*`}
              </span>
            </div>
          ))}
        </div>

        <div className="lg:w-1/2 lg:ml-10 mt-8 lg:mt-5">
          {/* First Person Tax Coverage */}
          <div className="font-bold text-gray-800 mb-1">{firstPerson.name}s Target Tax Coverage 25%</div>
          {generateAges(firstPerson.beginAge).map((age) => (
            <div key={`tax-first-${age}`} className="mb-2">
              <span>
                {`$${calculateTaxCoverage(calculateGrowth(firstPerson.beginAmount, yearsSinceBegin(age, firstPerson.beginAge)))}MM`}
              </span>
            </div>
          ))}
          {/* Second Person Tax Coverage */}
          <div className="font-bold text-gray-800 mb-7">{secondPerson.name}s Target Tax Coverage 25%</div>
          {generateAges(secondPerson.beginAge).map((age) => (
            <div key={`tax-second-${age}`} className="mb-3">
              <span>
                {`$${calculateTaxCoverage(calculateGrowth(secondPerson.beginAmount, yearsSinceBegin(age, secondPerson.beginAge)))}B*`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyGarden;
