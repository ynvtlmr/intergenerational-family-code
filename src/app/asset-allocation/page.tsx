"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ResponsivePie } from '@nivo/pie';

// Custom Currency Input Component
const CurrencyInput = ({ value, onChange, ...props }: { value: string, onChange: (value: string) => void, [key: string]: any }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(formatNumberAsCurrency(value));
  }, [value]);

  const handleInputChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value.replace(/[^\d.]/g, ''); // Allow numbers and dot only
    onChange(value); // Update external state
    setInputValue(formatNumberAsCurrency(value));
  };

  const formatNumberAsCurrency = (value: string) => {
    if (!value) return '';
    const number = Number(value.replace(/,/g, ''));
    return number.toLocaleString('en-US', {
      style: 'decimal',
      maximumFractionDigits: 20,
    });
  };

  return (
    <TextField
      {...props}
      value={inputValue}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
        style: { textAlign: 'right' },
      }}
      placeholder="$0"
    />
  );
};

// Asset Table Component
const AssetTable = ({ data, onDataChange, onDeleteRow }: { data: any, onDataChange: any, onDeleteRow: any }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Band</TableCell>
          <TableCell align="right">Target Allocation (%)</TableCell>
          <TableCell align="right">Target Net Return (%)</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row: { type: unknown; band: unknown; targetAllocation: unknown; targetNetReturn: unknown; }, idx: React.Key | null | undefined) => (
          <TableRow key={idx}>
            <TableCell>
              <TextField
                fullWidth
                variant="outlined"
                value={row.type}
                onChange={(e) => onDataChange(idx, 'type', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                variant="outlined"
                value={row.band}
                onChange={(e) => onDataChange(idx, 'band', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={row.targetAllocation}
                onChange={(e) => onDataChange(idx, 'targetAllocation', e.target.value)}
                InputProps={{
                  style: { textAlign: 'right' },
                }}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={row.targetNetReturn}
                onChange={(e) => onDataChange(idx, 'targetNetReturn', e.target.value)}
                InputProps={{
                  style: { textAlign: 'right' },
                }}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onDeleteRow(idx)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Sharpe Ratio Table Component
const SharpeRatioTable = ({ data, onDataChange, onDeleteRow }: { data: any[]; onDataChange: any; onDeleteRow: any }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Band</TableCell>
          <TableCell align="right">Sharpe Ratio Target ($)</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row: { type: unknown; band: unknown; sharpeRatioTarget: string; }, idx: React.Key | null | undefined) => (
          <TableRow key={idx}>
            <TableCell>
              <TextField
                fullWidth
                variant="outlined"
                value={row.type}
                onChange={(e) => onDataChange(idx, 'type', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                variant="outlined"
                value={row.band}
                onChange={(e) => onDataChange(idx, 'band', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <CurrencyInput
                fullWidth
                variant="outlined"
                value={row.sharpeRatioTarget}
                onChange={(newValue) => onDataChange(idx, 'sharpeRatioTarget', newValue)}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onDeleteRow(idx)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Asset Pie Chart Component
const AssetPieChart = ({ data }: { data: any[] }) => (
  <div style={{ height: 400 }}>
    <ResponsivePie
      data={data.map((asset: { type: any; targetAllocation: any; }) => ({
        id: asset.type,
        label: asset.type,
        value: asset.targetAllocation,
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

type Idk = {
  [key: string]: any;
};

// Main Asset Allocation Component
const AssetAllocationComponent = () => {
  const [tableData, setTableData] = useState<Idk[]>([
    { type: 'Bonds', band: '0-24%', targetAllocation: 40, targetNetReturn: 5 },
    { type: 'Stocks', band: '25-50%', targetAllocation: 60, targetNetReturn: 10 }
  ]);
  const [sharpeRatioData, setSharpeRatioData] = useState<Idk[]>([
    { type: 'Bonds', band: '0-24%', sharpeRatioTarget: '0.5' },
    { type: 'Stocks', band: '25-50%', sharpeRatioTarget: '1.2' }
  ]);

  const handleDataChange = (idx: number, field: string, value: any) => {
    const updatedData = [...tableData];
    updatedData[idx][field] = value;
    setTableData(updatedData);
  };

  const handleSharpeRatioChange = (idx: number, field: string, value: any) => {
    const updatedData = [...sharpeRatioData];
    updatedData[idx][field] = value;
    setSharpeRatioData(updatedData);
  };

  const addAssetRow = () => {
    setTableData(currentData => [...currentData, { type: '', band: '', targetAllocation: 0, targetNetReturn: 0 }]);
  };

  const addSharpeRatioRow = () => {
    setSharpeRatioData(currentData => [...currentData, { type: '', band: '', sharpeRatioTarget: '' }]);
  };

  const deleteAssetRow = (idx: number) => {
    setTableData(currentData => currentData.filter((_, index) => index !== idx));
  };

  const deleteSharpeRatioRow = (idx: number) => {
    setSharpeRatioData(currentData => currentData.filter((_, index) => index !== idx));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Asset Allocation</h1>
      <Button startIcon={<AddCircleOutlineIcon />} onClick={addAssetRow} variant="contained" color="primary" style={{ marginRight: 10 }}>
        Add Asset Row
      </Button>
      <Button startIcon={<AddCircleOutlineIcon />} onClick={addSharpeRatioRow} variant="contained" color="primary">
        Add Sharpe Ratio Row
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div>
          <AssetTable data={tableData} onDataChange={handleDataChange} onDeleteRow={deleteAssetRow} />
          <AssetPieChart data={tableData} />
        </div>
        <div>
          <SharpeRatioTable data={sharpeRatioData} onDataChange={handleSharpeRatioChange} onDeleteRow={deleteSharpeRatioRow} />
        </div>
      </div>
    </div>
  );
};

export default AssetAllocationComponent;