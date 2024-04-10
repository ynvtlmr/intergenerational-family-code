export default function PDFPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose min-h-dvh max-w-full border p-5 print:border-none">
      {children}
    </div>
  );
}
