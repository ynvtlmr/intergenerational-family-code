"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFamilyGardenStore } from "./family-garden-store";

export default function GrowthRate() {
  const growthRate = useFamilyGardenStore((state) => state.growthRate);
  const setGrowthRate = useFamilyGardenStore((s) => s.setGrowthRate);
  return (
    <>
      <Label className="mb-4">Growth Rate</Label>
      <div className="flex items-center gap-2">
        <Input
          className="w-20"
          type="number"
          min="0"
          max="100"
          value={growthRate}
          onChange={(e) => setGrowthRate(+e.target.value)}
        />
        <span>%</span>
      </div>
    </>
  );
}
