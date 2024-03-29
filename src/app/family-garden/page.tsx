"use client";

import { Person, useFamilyGardenStore } from "./family-garden-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function FamilyGarden() {
  const growthRate = useFamilyGardenStore((state) => state.growthRate);
  const setGrowthRate = useFamilyGardenStore((s) => s.setGrowthRate);
  const people = useFamilyGardenStore((state) => state.people);

  return (
    <main className="container mt-6">
      <h1 className="mb-2 text-3xl font-bold">Family Garden</h1>
      <Label className="mb-2">Growth Rate</Label>
      <div className="flex items-center gap-2">
        <Input
          className="w-20"
          type="number"
          min="0"
          max="100"
          value={growthRate}
          onChange={(e) => setGrowthRate(+e.target.value)}
        />
        <span>%</span>
      </div>
      <PersonForm />
    </main>
  );
  // };

  // const calculateGrowth = (initialAmount: string, years: number) => {
  //   const amount = parseFloat(initialAmount.replace(/[$,]/g, "")) || 0;
  //   return `$${(amount * Math.pow(1 + (growthRate ? growthRate : INITIAL_GROWTH_RATE), years)).toFixed(2)}`;
  // };

  // const calculateTaxCoverage = (growthAmount: string) => {
  //   const amount = parseFloat(growthAmount.replace(/[$,]/g, ""));
  //   const tax = amount * 0.25;
  //   return `$${tax.toFixed(2)}`;
  // };

  // const generateAges = (beginAge: number) => {
  //   const ages: number[] = [];
  //   for (let age = beginAge; age <= 110; age += 10) {
  //     ages.push(age);
  //   }
  //   return ages;
  // };

  // const yearsSinceBegin = (age: number, beginAge: number) => age - beginAge;

  // return (
  //   <Container>
  //     <Typography variant="h4" component="h1" gutterBottom>
  //       Family Garden
  //     </Typography>
  //     <Typography variant="subtitle1" gutterBottom>
  //       The more powerful the seed the longer it takes to germinate
  //     </Typography>
  //     <Box my={4}>
  //       <TextField
  //         id="growthRate"
  //         label="Growth Rate (%)"
  //         type="number"
  //         variant="outlined"
  //         fullWidth
  //         value={(
  //           (growthRate ? growthRate : INITIAL_GROWTH_RATE) * 100
  //         ).toString()}
  //         onChange={handleGrowthRateChange}
  //         margin="normal"
  //       />
  //     </Box>
  //     {people &&
  //       people.map((person: any, index: number) => (
  //         <Card
  //           key={person.id}
  //           variant="outlined"
  //           sx={{ mb: 5, position: "relative" }}
  //         >
  //           <CardContent>
  //             <TextField
  //               label={`Person ${index + 1}'s Name`}
  //               variant="outlined"
  //               fullWidth
  //               value={person.name}
  //               onChange={(e) => handleNameChange(person.id, e.target.value)}
  //               margin="normal"
  //             />
  //             <TextField
  //               label={`Person ${index + 1}'s Begin Age`}
  //               type="number"
  //               variant="outlined"
  //               fullWidth
  //               value={person.beginAge.toString()}
  //               onChange={(e) =>
  //                 handleBeginAgeChange(person.id, e.target.value)
  //               }
  //               margin="normal"
  //             />
  //             <TextField
  //               label="Begin Amount"
  //               variant="outlined"
  //               fullWidth
  //               value={person.beginAmount}
  //               onChange={(e) =>
  //                 handleBeginAmountChange(person.id, e.target.value)
  //               }
  //               margin="normal"
  //               InputProps={{
  //                 style: { textAlign: "right" },
  //               }}
  //             />
  //             {generateAges(person.beginAge).map((age) => (
  //               <Box
  //                 key={`${person.id}-${age}`}
  //                 display="flex"
  //                 justifyContent="space-between"
  //                 my={3}
  //               >
  //                 <Typography>Age: {age}</Typography>
  //                 <Typography>
  //                   Net Worth Growth:{" "}
  //                   {calculateGrowth(
  //                     person.beginAmount,
  //                     yearsSinceBegin(age, person.beginAge)
  //                   )}
  //                 </Typography>
  //                 <Typography>
  //                   Target Tax (25%):{" "}
  //                   {calculateTaxCoverage(
  //                     calculateGrowth(
  //                       person.beginAmount,
  //                       yearsSinceBegin(age, person.beginAge)
  //                     )
  //                   )}
  //                 </Typography>
  //               </Box>
  //             ))}
  //           </CardContent>
  //           <Box sx={{ position: "absolute", top: -5, right: -5 }}>
  //             <IconButton
  //               onClick={() => handleDialogOpen(person.id)}
  //               aria-label="delete"
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           </Box>
  //         </Card>
  //       ))}
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={addNewPerson}
  //       sx={{ mt: 3 }}
  //     >
  //       Add Person
  //     </Button>

  //     <Button
  //       variant="contained"
  //       color="success"
  //       onClick={resetData}
  //       sx={{ mt: 3, ml: 2 }}
  //     >
  //       Reset Data
  //     </Button>
  //     <Dialog
  //       open={openDialog}
  //       onClose={handleDialogClose}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //     >
  //       <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText id="alert-dialog-description">
  //           Are you sure you want to delete this person? This action cannot be
  //           undone.
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleDialogClose}>Cancel</Button>
  //         <Button onClick={confirmDelete} color="error">
  //           Delete
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </Container>
  // );
}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function PersonTable({ person }: { person: Person }) {
  const deletePerson = useFamilyGardenStore((s) => s.deletePerson);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {people.map((person) => (
          <TableRow key={person.name}>
            <TableCell className="font-medium">{person.name}</TableCell>
            <TableCell>{person.beginAge}</TableCell>
            <TableCell>{person.beginAmount}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const personFormSchema = z.object({
  name: z.string().min(2).max(50),
  beginAge: z.coerce.number().min(0).max(100),
  beginAmount: z.coerce.number().min(0),
});

type PersonFormSchema = z.infer<typeof personFormSchema>;

function PersonForm() {
  const form = useForm<PersonFormSchema>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      name: "",
      beginAge: 30,
      beginAmount: 0,
    },
  });
  const addPerson = useFamilyGardenStore((s) => s.addPerson);
  function onSubmit(values: PersonFormSchema) {
    addPerson(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 space-y-8 rounded-lg border p-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beginAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beginAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Amount</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <span>$</span>
                  <Input type="number" placeholder="0" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Person</Button>
      </form>
    </Form>
  );
}
