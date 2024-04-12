import { Suspense } from "react";
import PrintPDFButton from "./print-pdf-button";
import Loading from "@/components/loading";
import PDFPages from "./pdf-pages";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function PrintPDFPage() {
  return (
    <AuthenticatedRoute>
      <main className="w-full p-5  print:p-0">
        <h1 className="mb-5 text-4xl font-bold print:hidden">
          Intergenerational Family Code Report
        </h1>
        <PrintPDFButton />
        <Suspense fallback={<Loading />}>
          <PDFPages />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
