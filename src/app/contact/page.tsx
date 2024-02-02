// inside the contact page it should have a function name org and email
// right now it is just a form not using any react.
export default function Contactpage() {
  return (
    <>
      <h1 className="flex justify-center py-2 font-bold text-3xl">
        This is the Contact Page
      </h1>
      <form className="space-y-6  p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Function"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md  "
        />
        <input
          type="text"
          placeholder="Organization"
          className=" w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Email"
          className=" w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className=" w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}
