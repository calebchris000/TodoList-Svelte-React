<script lang="ts">
  import { store } from "./store";
  let show:boolean;

  $: show = $store.addTodo.show
  let value: string;
  let min: number = 10000000;
  let max: number = 99999999;

  function addTodo() {
   if(value.length > 0) {
    store.update((defaults) => {
      let id = Math.floor(Math.random() * (max - min + 1)) + min;
      defaults.todo.push({ id, value, completed: false });
      defaults.addTodo.show = false
      return defaults;
    });
    value = ''
   }
  }

</script>

<section
  class={`absolute bottom-[-20rem] left-0 px-10 flex flex-col gap-4 items-center py-5 transition-all justify-center right-0 bg-gray-200 ${
    show && "bottom-[0!important]"
  }`}
>
  <h3 class="text-xl text-center">Add Todo</h3>

  <input on:keydown={(e) => e.key ==='Enter' && addTodo()} bind:value class="outline-none w-full p-2 rounded-lg" type="text" placeholder="Add Todo..." />
  <button class="bg-red-500 text-white w-full p-2 rounded-lg" on:click={addTodo}>Add Todo</button>
</section>
