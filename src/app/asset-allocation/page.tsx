"use client";

import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

type AssetRow = {
  band: string;
  targetAllocation: number;
  targetNetReturn: number;
};

const AssetTable = ({ data, onDataChange }: { data: AssetRow[]; onDataChange: (idx: number, field: keyof AssetRow, value: string) => void }) => (
      <div className="overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Band
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Allocation (%)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Net Return (%)
                      </th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, idx) => (
                      <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.band} {/* Non-editable band field */}
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
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
    

const AssetPieChart = ({ data }: { data: AssetRow[] }) => (
  <div style={{ height: '300px' }}>
    <ResponsivePie
      data={data.map((item) => ({
        id: item.band,
        label: item.band,
        value: item.targetAllocation,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      }))}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'nivo' }}
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
  const [tableData, setTableData] = useState<AssetRow[]>([
    { band: 'Real Estate 10-30%', targetAllocation: 25, targetNetReturn: 5 },
    { band: 'Private Equity 0-90%', targetAllocation: 40, targetNetReturn: 20 },
    { band: 'Public Equity 0-30%', targetAllocation: 20, targetNetReturn: 5 },
    { band: 'Fixed Income 0-10%', targetAllocation: 5, targetNetReturn: 3 },
    { band: 'Cash 0-20%', targetAllocation: 10, targetNetReturn: 0 },
    { band: 'Life Insurance 25-100%', targetAllocation: 50, targetNetReturn: 0 },
  ]);

  const handleDataChange = (idx: number, field: keyof AssetRow, value: string) => {
    setTableData((currentData) => {
      return currentData.map((item, index) => {
        return index === idx
          ? {
              ...item,
              [field]: field === 'band' ? value : parseFloat(value) || 0,
            }
          : item;
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Asset Allocation</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <AssetTable data={tableData} onDataChange={handleDataChange} />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sharpe Ratio Target Pie Chart Format</h2>
          <AssetPieChart data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default AssetAllocationComponent;
