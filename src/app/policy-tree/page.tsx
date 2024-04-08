import React, { Suspense } from "react";
import PolicyTreeForm from "./policy-tree-form";

import Policies from "./policies";
import Loading from "@/components/loading";

export default function PolicyPage() {
  return (
    <section className="pt-10">
      <div className="container">
        <h1 className="mb-8 text-center text-5xl font-bold">Policy Tree</h1>
        <div className="space-y-10">
          <PolicyTreeForm />
          <Suspense fallback={<Loading />}>
            <Policies />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
