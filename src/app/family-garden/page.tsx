"use client";

import React, { useState } from 'react';

const FamilyGarden: React.FC = () => {
  const [growthRate] = useState(0.05); // Assumed growth rate
  const [firstPerson, setFirstPerson] = useState({
    name: 'First Person',
    beginAmount: '',
    ages: [36, 40, 50, 60, 70, 80, 90]
  });
  const [secondPerson, setSecondPerson] = useState({
    name: 'Second Person',
    beginAmount: '',
    ages: [60, 70, 80, 90]
  });

  // Function to calculate compound interest
  const calculateGrowth = (initialAmount: string, years: number) => {
    const amount = parseFloat(initialAmount) || 0;
    return (amount * Math.pow(1 + growthRate, years)).toFixed(2);
  };

  // Function to calculate target tax coverage
  const calculateTaxCoverage = (amount: string) => {
    const numberAmount = parseFloat(amount) || 0;
    return (numberAmount * 0.25).toFixed(2); // 25% of the amount
  };

  // Handlers for name and amount changes
  const handleNameChange = (isSecondPerson: boolean, newName: string) => {
    if (isSecondPerson) {
      setSecondPerson((prev) => ({ ...prev, name: newName }));
    } else {
      setFirstPerson((prev) => ({ ...prev, name: newName }));
    }
  };

  const handleBeginAmountChange = (isSecondPerson: boolean, newAmount: string) => {
    if (isSecondPerson) {
      setSecondPerson((prev) => ({ ...prev, beginAmount: newAmount }));
    } else {
      setFirstPerson((prev) => ({ ...prev, beginAmount: newAmount }));
    }
  };

  // Helper to calculate the number of years since the beginning age
  const yearsSinceBegin = (age: number, beginAge: number) => age - beginAge;

  return (
    <div className="bg-white p-8">
      <div className="font-serif text-4xl text-gray-700">
        Family Garden
      </div>
      <div className="italic text-gray-500 my-2">
        "The more powerful the seed the longer it takes to germinate"
      </div>

      <div className="flex flex-col lg:flex-row justify-between mt-8">
        {/* Net Worth Growth Section */}
        <div className="lg:w-1/2">
          {/* First Person Section */}
          <input
            type="text"
            placeholder="Enter First Person's Name"
            className="border-2 border-gray-200 rounded p-1 text-right my-2"
            value={firstPerson.name}
            onChange={(e) => handleNameChange(false, e.target.value)}
          />
          <div className="flex justify-between mb-2">
            <span>Starting Amount(begin age):</span>
            <input
              type="text" // Changed to text to allow for decimal input
              className="border-2 border-gray-200 rounded p-1"
              value={firstPerson.beginAmount}
              onChange={(e) => handleBeginAmountChange(false, e.target.value)}
            />
          </div>
          {/* Display Ages and Growth for First Person */}
          {firstPerson.ages.slice(1).map((age) => ( // Start from the second element
            <div key={`first-${age}`} className="flex justify-between mb-2">
              <span>Age: {age}</span>
              <span>
                {`$${calculateGrowth(firstPerson.beginAmount, yearsSinceBegin(age, firstPerson.ages[0]))}MM`}
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
          <div className="flex justify-between mb-2">
            <span>Starting Amount(begin age):</span>
            <input
              type="text" // Changed to text to allow for decimal input
              className="border-2 border-gray-200 rounded p-1"
              value={secondPerson.beginAmount}
              onChange={(e) => handleBeginAmountChange(true, e.target.value)}
            />
          </div>
          {/* Display Ages and Growth for Second Person */}
          {secondPerson.ages.slice(1).map((age) => ( // Start from the second element
            <div key={`second-${age}`} className="flex justify-between mb-2">
              <span>Age: {age}</span>
              <span>
                {`$${calculateGrowth(secondPerson.beginAmount, yearsSinceBegin(age, secondPerson.ages[0]))}B*`}
              </span>
            </div>
          ))}
        </div>

        {/* Target Tax Coverage Section */}
        <div className="lg:w-1/2 lg:ml-10 mt-8 lg:mt-5">
          {/* First Person Tax Coverage */}
          <div className="font-bold text-gray-800 mb-4">{firstPerson.name}'s Target Tax Coverage 25%</div>
          {firstPerson.ages.map((age) => (
            <div key={`tax-first-${age}`} className="mb-2">
              <span>
                {`$${calculateTaxCoverage(calculateGrowth(firstPerson.beginAmount, yearsSinceBegin(age, firstPerson.ages[0])))}MM`}
              </span>
            </div>
          ))}
          {/* Second Person Tax Coverage */}
          <div className="font-bold text-gray-800 mb-10">{secondPerson.name}'s Target Tax Coverage 25%</div>
          {secondPerson.ages.map((age) => (
            <div key={`tax-second-${age}`} className="mb-2">
              <span>
                {`$${calculateTaxCoverage(calculateGrowth(secondPerson.beginAmount, yearsSinceBegin(age, secondPerson.ages[0])))}B*`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyGarden;
