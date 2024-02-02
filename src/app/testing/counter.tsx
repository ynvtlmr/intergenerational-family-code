"use client";

import { Button } from "@/components/ui/button";
import { useCounterStore } from "./counter.store";

export default function Counter() {
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  return (
    <>
      <div className="space-x-5">{count}</div>
      <Button onClick={() => increment()}>Increment</Button>
    </>
  );
}
