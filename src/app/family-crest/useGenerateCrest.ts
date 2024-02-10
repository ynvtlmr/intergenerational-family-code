import { useMutation } from "@tanstack/react-query";
import { FormSchema as familyCrestFormSchema } from "./family-crest-form";

export default function useGenerateCrest() {
  const { mutate, data, isPending, error } = useMutation({
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
      const data: { url: string } = await response.json();
      return data.url;
    },
  });
  return { generateFamilyCrest: mutate, crest: data, isPending, error };
}
