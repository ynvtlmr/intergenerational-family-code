import { IQuestion } from "../../../types/questions";

import React from "react";
interface QuestionProps {
  questions: IQuestion[];
}
const Questions: React.FC<QuestionProps> = ({ questions }) => {
  // if (!questions) {
  //   return <div>Loading questions...</div>; // or return null;
  // }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-3xl">Questions</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;
