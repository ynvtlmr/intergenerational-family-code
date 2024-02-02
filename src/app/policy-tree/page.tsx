import React from "react";
import { DataTable } from "../../components/ui/data-table";
import { User, columns } from "./columns";

const policyData: User[] = [
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
  {
    id: "3",
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
    Owner: "Mike",
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
    Carrier: "Sun Life",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Sara",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2028-01-01",
    Insured: "April Stark",
  },
  {
    id: "10",
    Carrier: "Canada Life",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Estephane",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2028-01-01",
    Insured: "April Stark",
  },
  {
    id: "11",
    Carrier: "Canada Life",
    Type: "Par Whole Life",
    Amount: 100000000,
    Owner: "Pariya",
    Beneficiary: "Eterna",
    Payor: "Eterna",
    Anniversary: "2028-01-01",
    Insured: "April Stark",
  },
];

export default function PolicyComponent() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-8 text-center text-5xl font-bold">Policy Tree</h1>
        <DataTable columns={columns} data={policyData} />
      </div>
    </section>
  );
}
