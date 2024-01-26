// "use client";
// import Modal from "./Modal";
// import React from "react";
// import { IQuestion } from "../../../types/questions";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { FormEventHandler, useState } from "react";
// import { useRouter } from "next/navigation";
// import { editQuestion, deleteQuestion } from "../../../api";

// interface QuestionProps {
//   questions: IQuestion[];
// }
// const Questions: React.FC<QuestionProps> = ({ questions }) => {
//   const router = useRouter();
//   const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
//   const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
//   const [questionEdit, setQuestionEdit] = useState<string>(questions.text);
//   const handleSubmitEditQuestion: FormEventHandler<HTMLFormElement> = async (
//     e
//   ) => {
//     e.preventDefault();
//     await editQuestion({
//       id: questions.id,
//       text: questionEdit,
//     });

//     setOpenModalEdit(false);
//     router.refresh();
//   };
//   const handleDeleteQuestion = async (id: string) => {
//     await deleteQuestion(id);
//     setOpenModalDelete(false);
//     router.refresh();
//   };
//   return (
//     <div className="overflow-x-auto">
//       <table className="table">
//         {/* head */}
//         <thead>
//           <tr>
//             <th className="text-3xl mb-30">Questions</th>
//             <th className="text-2xl mb-30">Action</th>
//           </tr>
//         </thead>
//         <tbody className="text-2xl">
//           {questions.map((question) => (
//             <tr key={question.id}>
//               <td className="w-full">{question.text}</td>
//               <td className="flex gap-5">
//                 <FaRegEdit
//                   onClick={() => setOpenModalEdit(true)}
//                   cursor="pointer"
//                   className="text-blue"
//                   size={25}
//                 />
//                 <Modal
//                   modalOpen={openModalEdit}
//                   setModalOpen={setOpenModalEdit}
//                 >
//                   <form onSubmit={handleSubmitEditQuestion}>
//                     <h3 className="font-bold text-lg">Edit</h3>
//                     <div className="modal-action">
//                       <input
//                         value={questionEdit}
//                         onChange={(e) => setQuestionEdit(e.target.value)}
//                         type="text"
//                         placeholder="Type here"
//                         className="input input-bordered w-full max-w-xs"
//                       />
//                       <button type="submit" className="btn">
//                         Submit
//                       </button>
//                     </div>
//                   </form>
//                 </Modal>
//                 <RiDeleteBinLine
//                   onClick={() => setOpenModalDelete(true)}
//                   cursor="pointer"
//                   className="text-red"
//                   size={25}
//                 />
//                 <Modal
//                   modalOpen={openModalDelete}
//                   setModalOpen={setOpenModalDelete}
//                 >
//                   <h3 className="text-lg">
//                     Are you sure you want to delete this question ?
//                   </h3>
//                   <div className="modal-action">
//                     <button
//                       onClick={() => handleDeleteQuestion(question.id)}
//                       className="btn"
//                     >
//                       Yes
//                     </button>
//                   </div>
//                 </Modal>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Questions;
"use client";

import React, { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "./Modal";
import { IQuestion } from "../../../types/questions";
import { editQuestion, deleteQuestion } from "../../../api";

interface QuestionProps {
  questions: IQuestion[];
}

const Questions: React.FC<QuestionProps> = ({ questions }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [questionEdit, setQuestionEdit] = useState<string>("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  const handleEditClick = (questionId: string, questionText: string) => {
    setEditingQuestionId(questionId);
    setQuestionEdit(questionText);
    setOpenModalEdit(true);
  };

  const handleSubmitEditQuestion: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (editingQuestionId) {
      await editQuestion({
        id: editingQuestionId,
        text: questionEdit,
      });
      // Reset states and refresh the questions list
      setEditingQuestionId(null);
      setQuestionEdit("");
      setOpenModalEdit(false);
      router.refresh();
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestion(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
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
                <FaRegEdit
                  onClick={() => handleEditClick(question.id, question.text)}
                  cursor="pointer"
                  className="text-blue"
                  size={25}
                />
                <Modal
                  modalOpen={openModalEdit}
                  setModalOpen={setOpenModalEdit}
                >
                  <form onSubmit={handleSubmitEditQuestion}>
                    <h3 className="font-bold text-lg">Edit Question</h3>
                    <div className="modal-action">
                      <input
                        value={questionEdit}
                        onChange={(e) => setQuestionEdit(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                      />
                      <button type="submit" className="btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </Modal>
                <RiDeleteBinLine
                  onClick={() => handleDeleteQuestion(question.id)}
                  cursor="pointer"
                  className="text-red"
                  size={25}
                />
                {/* Delete Modal */}
                <Modal
                  modalOpen={openModalDelete}
                  setModalOpen={setOpenModalDelete}
                >
                  <h3 className="text-lg">
                    Are you sure you want to delete this question?
                  </h3>
                  <div className="modal-action">
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="btn"
                    >
                      Yes
                    </button>
                  </div>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;
