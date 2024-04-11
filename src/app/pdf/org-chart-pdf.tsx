"use client";
import { useOrgChartImageStore } from "../org-chart/org-chart-store";
import PDFPage from "./pdf-page";
import Image from "next/image";

export default function FamilyTreePDF() {
  const orgChartImage = useOrgChartImageStore((s) => s.imgString);
  return (
    <PDFPage>
      <h1>Org Chart</h1>
      <Image
        src={orgChartImage}
        alt="Org Chart"
        className="w-full"
        width={1024}
        height={768}
      />
    </PDFPage>
  );
}
