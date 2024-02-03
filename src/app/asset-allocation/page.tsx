"use client";
import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

const formatCurrency = (value) => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue) || numberValue === 0) return "";
  return numberValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const parseCurrency = (formattedValue) => {
  return formattedValue.replace(/[$,]/g, '');
};

const AssetTable = ({ data, onDataChange, onDeleteRow }) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Band
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Target Allocation (%)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Target Net Return (%)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <input
                type="text"
                value={row.type}
                onChange={(e) => onDataChange(idx, 'type', e.target.value)}
                className="w-full p-1 border-none bg-transparent"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <input
                type="text"
                value={row.band}
                onChange={(e) => onDataChange(idx, 'band', e.target.value)}
                className="w-full p-1 border-none bg-transparent"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <input
                type="number"
                value={row.targetAllocation}
                onChange={(e) => onDataChange(idx, 'targetAllocation', e.target.value)}
                className="w-full p-1 border-none bg-transparent text-right"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <input
                type="number"
                value={row.targetNetReturn}
                onChange={(e) => onDataChange(idx, 'targetNetReturn', e.target.value)}
                className="w-full p-1 border-none bg-transparent text-right"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={() => onDeleteRow(idx)} className="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SharpeRatioTable = ({ data, onDataChange, onDeleteRow }) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  useEffect(() => {
    data.forEach((row, index) => {
      if (index !== focusedIndex) {
        const element = document.getElementById(`sharpeRatioTarget-${index}`) as HTMLInputElement;
        if (element) {
          element.value = formatCurrency(row.sharpeRatioTarget);
        }
      }
    });
  }, [focusedIndex, data]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Band
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sharpe Ratio Target ($)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <input
                  type="text"
                  value={row.type}
                  onChange={(e) => onDataChange(index, 'type', e.target.value)}
                  className="w-full p-1 border-none bg-transparent"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <input
                  type="text"
                  value={row.band}
                  onChange={(e) => onDataChange(index, 'band', e.target.value)}
                  className="w-full p-1 border-none bg-transparent"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <input
                  id={`sharpeRatioTarget-${index}`}
                  type="text"
                  defaultValue={formatCurrency(row.sharpeRatioTarget)}
                  onChange={(e) => onDataChange(index, 'sharpeRatioTarget', parseCurrency(e.target.value))}
                  onBlur={() => setFocusedIndex(null)}
                  onFocus={() => setFocusedIndex(index)}
                  className="w-full p-1 border-none bg-transparent text-right"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onDeleteRow(index)} className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AssetPieChart = ({ data }) => (
  <div style={{ height: 300 }}>
    <ResponsivePie
      data={data.map((asset) => ({
        id: asset.type,
        label: asset.band,
        value: asset.targetAllocation,
      }))}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'set3' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    />
  </div>
);

const AssetAllocationComponent = () => {
  const [tableData, setTableData] = useState([
    { type: 'Bonds', band: '0-24%', targetAllocation: 40, targetNetReturn: 5 },
    { type: 'Stocks', band: '25-50%', targetAllocation: 60, targetNetReturn: 10 }
  ]);
  const [sharpeRatioData, setSharpeRatioData] = useState([
    { type: 'Bonds', band: '0-24%', sharpeRatioTarget: '0.5' },
    { type: 'Stocks', band: '25-50%', sharpeRatioTarget: '1.2' }
  ]);

  const handleDataChange = (idx, field, value) => {
    const updatedData = [...tableData];
    updatedData[idx][field] = value;
    setTableData(updatedData);
  };

  const handleSharpeRatioChange = (index, field, value) => {
    const updatedData = [...sharpeRatioData];
    updatedData[index][field] = value;
    setSharpeRatioData(updatedData);
  };

  const addAssetRow = () => {
    setTableData(currentData => [...currentData, { type: '', band: '', targetAllocation: 0, targetNetReturn: 0 }]);
  };

  const addSharpeRatioRow = () => {
    setSharpeRatioData(currentData => [...currentData, { type: '', band: '', sharpeRatioTarget: '' }]);
  };

  const deleteAssetRow = (idx) => {
    setTableData(currentData => currentData.filter((_, index) => index !== idx));
  };

  const deleteSharpeRatioRow = (idx) => {
    setSharpeRatioData(currentData => currentData.filter((_, index) => index !== idx));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Asset Allocation</h1>
      <button onClick={addAssetRow}>Add Asset Row</button>
      <button onClick={addSharpeRatioRow}>Add Sharpe Ratio Row</button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <AssetTable data={tableData} onDataChange={handleDataChange} onDeleteRow={deleteAssetRow} />
          <AssetPieChart data={tableData} />
        </div>
        <SharpeRatioTable data={sharpeRatioData} onDataChange={handleSharpeRatioChange} onDeleteRow={deleteSharpeRatioRow} />
      </div>
    </div>
  );
};

export default AssetAllocationComponent;
