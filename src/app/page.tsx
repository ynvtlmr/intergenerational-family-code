import { Button } from "@/components/ui/button";
import "./globals.css";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="mx-auto max-w-4xl px-2 pt-20">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Intergenerational Family Code
      </h1>
      <div className="mx-auto flex max-w-xl flex-col justify-center gap-2">
        <Button>
          <Link className="w-full" href="/decision-tree">
            Decision Tree
          </Link>
        </Button>
        <Button>
          <Link className="w-full" href="/family-tree">
            Family Tree
          </Link>
        </Button>
        <Button>
          {" "}
          <Link className="w-full" href="/family-crest">
            Family Crest
          </Link>
        </Button>
        <Button>
          <Link className="w-full" href="/family-garden">
            Family Garden
          </Link>
        </Button>
        <Button>
          {" "}
          <Link className="w-full" href="/family-values">
            Family Values
          </Link>
        </Button>
        <Button>
          <Link className="w-full" href="/org-chart">
            Organizational Chart
          </Link>
        </Button>
        <Button>
          <Link className="w-full" href="/contact">
            Contact
          </Link>
        </Button>
      </div>
    </main>
  );
}
