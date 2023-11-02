<script lang="ts">
  import Icon from "@iconify/svelte";
  import AddTodo from "./AddTodo.svelte";
  import TodoItem from "./TodoItem..svelte";
  import TodoNav from "./TodoNav.svelte";
  import { store } from "./store";

  function showAddTodo() {
    store.update((defaults) => {
      defaults.addTodo.show = true;
      return defaults;
    });
  }

  function hideAddTodo() {
    store.update((defaults) => {
      defaults.addTodo.show = false;
      return defaults;
    });
  }
  let todos: any[];
  let show: boolean;
  $: todos = $store.todo;
  $: show = $store.addTodo.show;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click|self={hideAddTodo} class="w-full relative bg-white h-[100vh] select-none">
  <TodoNav />

  <div class="my-4 mx-3 flex flex-col gap-3">
    {#if $store.todo.length === 0}
      <p class="text-2xl text-center">No Todo</p>
    {:else}
      {#each todos as todo (todo.id)}
        <TodoItem value={todo.value} completed={todo.completed} id={todo.id}/>
      {/each}
    {/if}
  </div>
  <button on:click={showAddTodo} class="absolute bottom-0 cursor-pointer left-[50%] translate-x-[-50%]">
    <Icon class=" text-[8rem] text-[#5ea8da]" icon="material-symbols:add-circle-rounded" />
  </button>
  <AddTodo />
</main>
