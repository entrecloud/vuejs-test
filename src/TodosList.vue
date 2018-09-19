<template lang="pug">
    div.todo-items
        Todo(
            v-for='todo in todos',
            :key="todo.id",
            :todo="todo",
            @toggle="$emit('toggle', todo.id)"
            @archive="$emit('archive', todo.id)"
        )
</template>

<script>
import Todo from './Todo'

export default {
    components: {
        Todo
    },
    props: {
        todos: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style>
.todo-item {
    margin-bottom: 12px;
}
</style>
