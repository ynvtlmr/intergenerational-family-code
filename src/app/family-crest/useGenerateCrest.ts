import { useMutation } from "@tanstack/react-query";
import { FormSchema as familyCrestFormSchema } from "./family-crest-form";
import { useFamilyCrest } from "./family-crest-store";

export default function useGenerateCrest() {
  const { updateCrest } = useFamilyCrest();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (family: familyCrestFormSchema) => {
      const response = await fetch(
        "http://127.0.0.1:5001/intergenerational-family-code/us-central1/generateFamilyCrest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(family),
        }
      );
      const resData: { url: string } = await response.json();
      return resData.url;
    },
    onSuccess(data) {
      updateCrest(data);
    },
  });
  return { generateFamilyCrest: mutate, isPending, error };
}
