import { useMutation } from "@tanstack/react-query";
import { InsertFamilyCrest as familyCrestFormSchema } from "./family-crest-form";
import { useFamilyCrestStore } from "./family-crest-store";
import { createClient } from "@/lib/supabase/client";

const randomString = (length: number) =>
  crypto.getRandomValues(new Uint8Array(length)).join("");

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
      // Check if a family crest was generated
      // If there is one then delete it from supabase and add a new one to the bucket
      // else add a new one to the bucket
      // create a new database entry for the family crest

      const imageFile = await fetch(resData.url).then((res) => res.blob());

      const bucket = "family_crest";

      const imageFilePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/`;

      const supabase = createClient();
      const { data: imageData, error } = await supabase.storage
        .from(bucket)
        .upload(randomString(8), imageFile, {
          contentType: imageFile.type,
        });

      if (error) {
        console.log(error);
      }
      console.log(imageData);
      return resData.url;
    },
    onSuccess(data) {
      updateCrest(data);
    },
  });
  return { generateFamilyCrest: mutate, isPending, error };
}
