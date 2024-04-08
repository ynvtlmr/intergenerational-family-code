import { useMutation } from "@tanstack/react-query";
import { InsertFamilyCrest as familyCrestFormSchema } from "./family-crest-form";
import { useFamilyCrestStore } from "./family-crest-store";

export default function useGenerateCrest() {
  const updateCrest = useFamilyCrestStore((s) => s.updateCrest);
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (family: familyCrestFormSchema) => {
      const response = await fetch("/api/generate-family-crest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(family),
      });
      const resData: { url: string } = await response.json();
      return resData.url;
    },
    onSuccess(data) {
      updateCrest(data);
    },
  });
  return { generateFamilyCrest: mutate, isPending, error };
}
