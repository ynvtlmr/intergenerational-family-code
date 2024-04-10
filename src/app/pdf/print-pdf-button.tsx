"use client";
import { Button } from "@/components/ui/button";

export default function PrintPDFButton() {
  const handleClick = () => {
    window.print();
  };
  return (
    <Button
      className="mb-5 print:hidden"
      onClick={handleClick}
      aria-label="Print PDF"
    >
      Print PDF
    </Button>
  );
}
