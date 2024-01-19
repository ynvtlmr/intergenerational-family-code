import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FamilyCrestPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Family Crest Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your family name and motto to generate a unique family crest.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="family-name">Family Name</Label>
            <Input id="family-name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="family-motto">Family Motto</Label>
            <Input id="family-motto" required />
          </div>
          <Button className="w-full" type="submit">
            Generate Crest
          </Button>
        </form>
      </div>
    </main>
  );
}
