<script lang="ts">
  import Icon from "@iconify/svelte";
  export let value: string;
  export let completed: boolean = false;
  import { store } from "./store";
  export let id: number;
  function handleComplete() {
    store.update((defaults) => {
      let filtered = defaults.todo.map((item) => {
        if (item.id === id) item.completed = !item.completed;
        return item;
      });
      let sorted = filtered.sort((a,b) => {
        if(a.completed && b.completed) return 0
        else if(a.completed) return 1
        else return -1
      })
      defaults.todo = sorted;
      return defaults;
    });
  }

  function handleDelete() {
    store.update(defaults => {
        let filtered = defaults.todo.filter(item => item.id !== id)
        defaults.todo = filtered
        return defaults
    })
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<section on:click|self={handleComplete} class="flex w-full justify-between py-3 font-semibold rounded-full px-5 bg-[#ececec] items-center">
  <p class="text-lg font-semibold" class:completed>{value}</p>
  <button on:click={handleDelete}>
    <Icon icon="material-symbols:delete-outline" class="text-3xl hover:text-red-500" />
  </button>
</section>

<style>
  .completed {
    text-decoration: line-through;
    color: rgb(165, 165, 165);
  }
</style>
