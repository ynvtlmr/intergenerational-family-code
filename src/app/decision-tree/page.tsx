import QuestionForm from "./question-form";
import Questions from "./Questions";


export default function DecisionTreePage() {
 
  return (
    <main className="max-w-4xl mx-auto pb-10">
      <div className="text-center my-8 flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold mb-2">Decision Tree</h1>
        <QuestionForm />
      </div>
      <Questions/>
    </main>
  );
}