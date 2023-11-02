import { GrAddCircle } from "react-icons/gr";
import { CgMenuBoxed } from "react-icons/cg";
import TodoItem from "./TodoItem";
import { FiPlusCircle } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import AddTodo from "./AddTodo";
const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
const isTablet = /iPad|Android/i.test(navigator.userAgent);

const TodoList = () => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
      const data = localStorage.getItem("data");
      if (data && data.length > 0) {
        setList(JSON.parse(data));
    }
  }, []);
  function onAdd(value) {
    const min = 10000000;
    const max = 99999999;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;

    if (value && value.length > 0) {
      const todo = { id, value, completed: false };
      setList([...list, todo]);
        localStorage.setItem("data", JSON.stringify([...list, todo]));
      setShow(false);
    }
  }

  function handleCompleted(id) {
    let completed = list.map((item) => {
      if (item.id == id) {
        item.completed = !item.completed;
      }
      return item;
    });

    completed = completed.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      else if (a.completed) return 1;
      else return -1;
    });
      localStorage.setItem("data", JSON.stringify(completed));

    setList(completed);
  }

  function handleDelete(e, id) {
    e.stopPropagation();
    const todo = list.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(todo));

    setList(todo);
  }

  return (
    <main className="w-full overflow-hidden h-[100dvh] flex flex-col relative mx-auto">
      <nav className="flex items-center h-12 relative flex-wrap w-full">
        <CgMenuBoxed className="absolute left-3 text-2xl" />
        <h2 className="text-xl mx-auto">All Tasks</h2>
      </nav>
      <section className="flex pt-5 flex-col gap-2 items-center justify-center todo-items px-3">
        {list.length === 0 && <p>No Todo</p>}
        {list &&
          list.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              value={item.value}
              completed={item.completed}
              onDelete={(e) => handleDelete(e, item.id)}
              onClick={() => handleCompleted(item.id)}
            />
          ))}
      </section>

      <FiPlusCircle onClick={() => setShow(true)} className="absolute w-full text-white fill-[#5da9e1] left-0 bottom-0 text-[8rem] right-0" />
      <AddTodo show={show} callback={onAdd} />
    </main>
  );
};

export default TodoList;
