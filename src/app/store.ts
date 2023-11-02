import { writable } from "svelte/store";

interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
}

interface Defaults {
  todo: TodoItem[];
  addTodo: {
    show: boolean;
  };
}
let defaults: Defaults = {
  todo: [],
  addTodo: {
    show: false,
  },
};

export let store = writable(defaults);

let data: any = localStorage.getItem("data");

if (data && data.length > 0) {
  store.update((defaults) => {
    defaults.todo = JSON.parse(data);
    return defaults;
  });
}

store.subscribe((defaults) => {
  localStorage.setItem("data", JSON.stringify(defaults.todo));
});
