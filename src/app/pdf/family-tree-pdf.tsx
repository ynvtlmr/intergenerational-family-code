"use client";
import { useFamilyTreeImageStore } from "../family-tree/family-tree-store";
import PDFPage from "./pdf-page";
import Image from "next/image";

export default function FamilyTreePDF() {
  const familyTreeImage = useFamilyTreeImageStore((s) => s.imgString);
  return (
    <PDFPage>
      <h1>Family Tree</h1>
      <Image
        src={familyTreeImage}
        alt="Family Tree"
        className="w-full"
        width={1024}
        height={768}
      />
    </PDFPage>
  );
}
