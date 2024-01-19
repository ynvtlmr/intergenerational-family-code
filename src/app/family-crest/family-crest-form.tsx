import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "./form-submit-button";

async function formAction(formData: FormData) {
  "use server";
  console.log("Form data", formData);
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function FamilyCrestForm() {
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="familyName">Family Name</Label>
        <Input
          id="familyName"
          name="familyName"
          placeholder="The Stark Family"
          value="The Stark Family"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="animal">Animal</Label>
        <Input
          id="animal"
          name="animal"
          placeholder="Eagle, lion"
          value="Eagle, lion"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="symbol">Symbol</Label>
        <Input id="symbol" name="symbol" placeholder="Sword" value="Sword" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="familyMotto">Family Motto</Label>
        <Input
          id="familyMotto"
          name="familyMotto"
          placeholder="Unity in Love, Strength in Respect"
          value="Unity in Love, Strength in Respect"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="details">Additional Details</Label>
        <Textarea
          id="details"
          name="details"
          placeholder="Flames coming off both sides of the sword"
          value="Flames coming off both sides of the sword"
        />
      </div>
      <FormSubmitButton />
    </form>
  );
}
