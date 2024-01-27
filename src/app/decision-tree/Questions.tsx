"use client";

import React, { useState, FormEventHandler } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "./Modal";
import { editQuestion, deleteQuestion } from "../../../api";
import { useFamilyQuestions } from "./family-questions-store";


export default function Questions() {
  const {questions} = useFamilyQuestions()

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
    
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestion(id);
    setOpenModalDelete(false);
  
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
            <tr key={question}>
              <td className="w-full">{question}</td>
              <td className="flex gap-5">
                <FaRegEdit
                  // onClick={() => handleEditClick(question.id, question.text)}
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
                  // onClick={() => handleDeleteQuestion(question.id)}
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
                      // onClick={() => handleDeleteQuestion(question.id)}
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

