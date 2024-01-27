import { IQuestion } from "../../../types/questions";
import AddQuestion from "./AddQuestion";
import Questions from "./Questions";


export default async function DecisionTreePage() {
 
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center text-4xl  my-5 flex flex-col gap-4 ">
        <h1 className="text-5xl font-bold">Decision Tree</h1>
        <AddQuestion />
      </div>
      <Questions />
    </main>
  );
}