"use client";
import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addQuestion } from "../../../api";
import { v4 as uuidv4 } from "uuid";

const AddQuestion = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newQuestionValue, setNewQuestionValue] = useState<string>("");

  const handleSubmitNewQuestion: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    await addQuestion({
      id: uuidv4(),
      text: newQuestionValue,
    });
    setNewQuestionValue("");
    setModalOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full text-2xl mt-10"
      >
        Add a Question <FaPlus className="ml-2" size={24} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewQuestion}>
          <h3 className="font-bold text-lg">Add a new question</h3>
          <div className="modal-action">
            <input
              value={newQuestionValue}
              onChange={(e) => setNewQuestionValue(e.target.value)}
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
    </div>
  );
};

export default AddQuestion;
