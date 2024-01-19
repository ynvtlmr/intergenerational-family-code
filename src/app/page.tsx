import "./globals.css";
import AddQuestion from "../app/components/AddQuestion";
import Questions from "../app/components/Questions";
import { getAllQuestions } from "../../api";

export default async function Home() {
  const questions = await getAllQuestions();
  console.log(questions);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center text-4xl  my-5 flex flex-col gap-4 ">
        <h1 className="text-5xl font-bold">Decision Tree</h1>
        <AddQuestion />
      </div>
      <Questions questions={questions} />
    </main>
  );
}
