import { IQuestion } from "../../../types/questions";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
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
            <th className="text-3xl mb-30">Questions</th>
            <th className="text-2xl mb-30">Action</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="w-full">{question.text}</td>
              <td className="flex gap-5">
                <FaRegEdit className="text-blue" size={25} />
                <RiDeleteBinLine className="text-red" size={25} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;
