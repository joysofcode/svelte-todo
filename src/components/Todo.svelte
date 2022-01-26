<script lang="ts">
  import { fade, slide } from 'svelte/transition'
  import type { ITodo } from '$root/types/todo'

  type CompleteTodoType = (id: string) => void
  type RemoveTodoType = (id: string) => void
  type EditTodoType = (id: string, newTodo: string) => void
  type DurationType = number

  export let todo: ITodo
  export let completeTodo: CompleteTodoType
  export let removeTodo: RemoveTodoType
  export let editTodo: EditTodoType
  export let duration: DurationType

  let editing = false

  function toggleEdit(): void {
    editing = true
  }

  function handleEdit(event: KeyboardEvent, id: string): void {
    let pressedKey = event.key
    let targetElement = event.target as HTMLInputElement
    let newTodo = targetElement.value

    switch (pressedKey) {
      case 'Escape':
        targetElement.blur()
        break
      case 'Enter':
        editTodo(id, newTodo)
        targetElement.blur()
        break
    }
  }

  function handleBlur(event: FocusEvent, id: string): void {
    let targetElement = event.target as HTMLInputElement
    let newTodo = targetElement.value

    editTodo(id, newTodo)
    targetElement.blur()
    editing = false
  }
</script>

<li in:slide={{ duration }} out:fade={{ duration }} class:editing class="todo">
  <div class="todo-item">
    <div>
      <input
        on:change={() => completeTodo(todo.id)}
        checked={todo.completed}
        id="todo"
        class="toggle"
        type="checkbox"
      />
      <label aria-label="Check todo" class="todo-check" for="todo" />
    </div>
    <span
      on:dblclick={toggleEdit}
      class:completed={todo.completed}
      class="todo-text"
    >
      {todo.text}
    </span>
    <button
      aria-label="Remove todo"
      on:click={() => removeTodo(todo.id)}
      class="remove"
    />
  </div>

  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:keydown={(event) => handleEdit(event, todo.id)}
      on:blur={(event) => handleBlur(event, todo.id)}
      class="edit"
      type="text"
      value={todo.text}
      autofocus
    />
  {/if}
</li>

<style>
  .todo {
    font-size: var(--font-24);
    font-weight: 400;
    border-bottom: 1px solid #ededed;
  }

  .todo:last-child {
    border-bottom: none;
  }

  .todo-check,
  .todo-text {
    display: block;
    padding: var(--spacing-16);
    color: var(--color-gray-28);
    transition: color 0.4s;
  }

  .todo-check {
    border-radius: 100%;
  }

  .completed {
    color: var(--color-gray-58);
    text-decoration: line-through;
  }

  .todo-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 var(--spacing-8);
  }

  .editing .todo-item {
    display: none;
  }

  .edit {
    width: 100%;
    padding: var(--spacing-8);
    font-size: var(--font-24);
    border: 1px solid #999;
    border-radius: var(--radius-base);
    box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
  }

  .toggle {
    position: absolute;
    top: 26px;
    left: 13px;
    transform: scale(2);
    opacity: 0;
  }

  .toggle + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: 84% 50%;
  }

  .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
  }

  .remove {
    display: none;
    margin-left: auto;
    font-size: var(--font-32);
    color: var(--color-gray-58);
    transition: color 0.2s ease-out;
  }

  .remove:hover {
    color: var(--color-highlight);
  }

  .remove:after {
    content: '×';
  }

  .todo:hover .remove {
    display: block;
  }
</style>
