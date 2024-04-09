"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addAssetAllocation } from "./actions";
import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";

const assetAllocationFormSchema = z.object({
  type: z.string(),
  band: z.string(),
  target_allocation: z.number(),
  target_net_return: z.number(),
  sharpe_ratio_target: z.number(),
});
export type InsertAssetAllocation = z.infer<typeof assetAllocationFormSchema>;

export default function AssetAllocationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertAssetAllocation>({
    resolver: zodResolver(assetAllocationFormSchema),
    defaultValues: {
      type: "",
      band: "",
      target_allocation: 0,
      target_net_return: 0,
      sharpe_ratio_target: 0,
    },
  });
  async function onSubmit(values: InsertAssetAllocation) {
    setIsSubmitting(true);
    await addAssetAllocation(values);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="band"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Band" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target_allocation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Target Allocation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target_net_return"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Target Net Return" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sharpe_ratio_target"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sharpe Ratio Target" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Add Asset Allocation"
          loadingText="Adding..."
        />
      </form>
    </Form>
  );
}
