"use client";

export default function PDFPage() {
  return (
    <main className="space-y-10 p-5">
      <Page title="Decision Tree">
        <p>Decision Tree content goes here</p>
      </Page>
      <Page title="Family Values">
        <p>Family Values content goes here</p>
      </Page>
      <Page title="Family Code">
        <p>Family Code content goes here</p>
      </Page>
      <Page title="Family Vision">
        <p>Family Code content goes here</p>
      </Page>
      <Page title="Philanthropy">
        <p>Philanthropy content goes here</p>
      </Page>
    </main>
  );
}

function Page({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl border p-5">
      <h1 className="mb-3 text-xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
