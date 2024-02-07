import "./globals.css";

export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto pt-20 px-2">
      <h1 className="font-bold text-4xl mb-8 text-center">Intergenerational Family Code</h1>
      <div className="flex flex-col gap-2 justify-center max-w-xl mx-auto">
      <Button><Link className="w-full" href="/decision-tree">Decision Tree</Link></Button>
       <Button><Link className="w-full" href="/family-tree">Family Tree</Link></Button>
     <Button> <Link className="w-full" href="/family-crest">Family Crest</Link></Button>
     <Button><Link className="w-full" href="/family-garden">Family Garden</Link></Button>
     <Button> <Link className="w-full" href="/family-values">Family Values</Link></Button>
      <Button><Link className="w-full" href="/org-chart">Organizational Chart</Link></Button>
      <Button><Link className="w-full" href="/contact">Contact</Link></Button>
      </div>
    </main>
  );
}
