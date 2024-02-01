import Questions from "./questions";
import FamilyQuestionForm from "./family-question-form";



export default function DecisionTreePage() {
 
  return (
     <main className="max-w-xl mx-auto mt-20 px-2">
      <FamilyQuestionForm />
      <Questions />
    </main>
  );
}