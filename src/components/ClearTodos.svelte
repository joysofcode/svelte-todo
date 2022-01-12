<script lang="ts">
  type ClearCompletedType = () => void
  type CompletedTodosType = number

  export let clearCompleted: ClearCompletedType
  export let completedTodos: CompletedTodosType
</script>

<button
  on:click={clearCompleted}
  class:hidden={completedTodos === 0}
  class="clear-completed"
>
  Clear completed
</button>
