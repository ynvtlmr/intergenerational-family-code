

import React from 'react';
import { DataTable } from '../../components/ui/data-table';
import { User, columns } from './columns';

export const policyData: User[] = [
        {
          id: "1",
          Carrier: "Sun Life",
          Type: "Par Whole Life",
          Amount: 100000000,
          Owner: "Eterna",
          Beneficiary: "Eterna",
          Payor: "Eterna",
          Anniversary: "2026-01-01",
          Insured: "Dustin Stark",
        },
        {
          id: "2",
          Carrier: "Manulife",
          Type: "Par Whole Life",
          Amount: 100000000,
          Owner: "Eterna",
          Beneficiary: "Eterna",
          Payor: "Eterna",
          Anniversary: "2026-01-01",
          Insured: "Dustin Stark",
        },
      {  id: "3",
    Carrier: "Canada Life",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2026-01-01",
    Insured: "Dustin Stark",
  },
  {
    id: "4",
    Carrier: "Sun Life",
    Type: "Par Whole Life",
    Amount: 10000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2027-01-01",
    Insured: "Amy Stark",
  },
  {
    id: "5",
    Carrier: "Manulife",
    Type: "Par Whole Life",
    Amount: 10000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2027-01-01",
    Insured: "Amy Stark",
  },
  {
    id: "6",
    Carrier: "Canada Life",
    Type: "Par Whole Life",
    Amount: 10000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2027-01-01",
    Insured: "Amy Stark",
  },
  {
    id: "7",
    Carrier: "Sun Life",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2028-01-01",
    Insured: "April Stark",
  },
  {
    id: "8",
    Carrier: "Manulife",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2028-01-01",
    Insured: "April Stark",
  },
  {
    id: "9",
    Carrier: "Canada Life",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Eterna",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2028-01-01",
    Insured: "April Stark",
  },
      ];

      const policyComponent: React.FC = () => {
        return (
          <section className="py-24">
            <div className='container'>
              <h1 className='text-center text-5xl font-bold mb-8'>Policy Tree</h1>
              <DataTable columns={columns} data={policyData} />
            </div>
          </section>
        );
      };
      
      export default policyComponent;