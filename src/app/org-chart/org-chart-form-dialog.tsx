"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";



const formSchema = z.object({
  label: z
  .string()
  .min(2, {message: "characters must be at least 2 characters or more"})
  .max(50, {message: "Characters must be less than 50 characters or lest"}),
})

type OrgChartFormSchema = z.infer<typeof formSchema>

export default function OrgChartFormDialog() {

   // 1. Define your form.
   const form = useForm<OrgChartFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: OrgChartFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Node</Button>
      </DialogTrigger>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
          <DialogDescription>
            This is where you can create a new node.
          </DialogDescription>
        </DialogHeader>

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
              <Input placeholder="Name of Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" size="lg" className="w-full">
              Add
         </Button>
        </DialogFooter>
      </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}