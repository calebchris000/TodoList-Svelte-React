import { useRef } from "react";

const AddTodo = ({ show, callback }) => {
  const inputRef = useRef();
  function handleSubmit(e) {
    console.log(e)
    callback(inputRef.current.value);
    inputRef.current.value = ""
  }
  return (
    <section
      className={`absolute rounded-lg py-4 flex flex-col transition-all gap-4 items-center px-10 outline-none ${
        show && "bottom-[0rem!important]"
      } z-[99] bottom-[-20rem] text-xl bg-[#ececec] border-2 h-52 w-full`}
    >
      <h2 className=" text-center">Add Todo</h2>
      <input
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        ref={inputRef}
        className="rounded-md px-3 py-2 w-full outline-none"
        type="text"
        placeholder="Add Todo Here..."
      />

      <button onClick={handleSubmit} className="border-2 bg-red-500 w-full block mx-auto px-3 rounded-md text-sm py-2 font-semibold">
        Add
      </button>
    </section>
  );
};

export default AddTodo;
