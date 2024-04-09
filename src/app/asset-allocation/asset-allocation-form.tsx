"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addAssetAllocation } from "./actions";
import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";
import MoneyInput from "@/components/money-input";

const assetAllocationFormSchema = z.object({
  type: z.string(),
  band: z.string(),
  target_allocation: z.coerce.number().min(0).max(100),
  target_net_return: z.coerce.number().min(0).max(100),
  sharpe_ratio_target: z.coerce.number().min(0.01, "Must be greater than 0"),
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Bonds" {...field} />
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
              <FormLabel>Band</FormLabel>
              <FormControl>
                <Input placeholder="0-24%" {...field} />
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
              <FormLabel>Target Allocation</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="40" {...field} />
                  <span>%</span>
                </div>
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
              <FormLabel>Target Net Return</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input placeholder="5" type="number" {...field} />
                  <span>%</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MoneyInput
          form={form}
          label="Sharpe Ratio Target"
          name="sharpe_ratio_target"
          placeholder="$0.00"
        />
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Add Asset Allocation"
          loadingText="Adding..."
        />
      </form>
    </Form>
  );
}
