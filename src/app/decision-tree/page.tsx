import Questions from "./questions";
import FamilyQuestionForm from "./family-question-form";

export default function DecisionTreePage() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <FamilyQuestionForm />
      <Questions />
    </main>
  );
}
