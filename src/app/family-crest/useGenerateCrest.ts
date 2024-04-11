import { useMutation } from "@tanstack/react-query";
import { InsertFamilyCrest as familyCrestFormSchema } from "./family-crest-form";
import { createClient } from "@/lib/supabase/client";
import { addFamilyCrest } from "./actions";

const randomString = (length: number) =>
  crypto.getRandomValues(new Uint8Array(length)).join("");

export default function useGenerateCrest() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (family: familyCrestFormSchema) => {
      const response = await fetch("/api/generate-family-crest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(family),
      });
      const resData = await response.json();
      // Decode the base64 string
      const imageFile = Buffer.from(resData, "base64");
      const bucket = "family_crest";

      const supabase = createClient();

      const imageName = randomString(8);
      const { data } = await supabase.auth.getUser();

      const { error } = await supabase.storage
        .from(bucket)
        .upload(imageName, imageFile, {
          contentType: "image/png",
        });

      if (error) {
        console.log(error);
      }
      const imageFilePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${imageName}`;
      await addFamilyCrest({
        name: family.name,
        symbol: family.symbol,
        color: family.color,
        motto: family.motto,
        animal: family.animal,
        details: family.details,
        image_url: imageFilePath,
      });
    },
  });
  return { generateFamilyCrest: mutate, isPending, error };
}
