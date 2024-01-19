import { FaPlus } from "react-icons/fa6";

const AddQuestion = () => {
  return (
    <div>
      <button className="btn btn-primary w-full text-2xl mt-10">
        Add a Question <FaPlus className="ml-2" size={24} />
      </button>
    </div>
  );
};

export default AddQuestion;
