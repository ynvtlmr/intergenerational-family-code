import { useCounterStore } from "./counter.store";

export default function Counter() {
  useCounterStore((s) => s.count);
  return <div></div>;
}
