<template lang="pug">
    div.todo-item(class="flex pv2 ph3 content-center br2 shadow-4", :class="{ 'is-complete': todo.complete }")
        div.todo-toggle
            input(
                :checked="todo.complete",
                type="checkbox",
                @input="$emit('toggle')",
            )
        div.todo-text(class="pl3 flex-auto", :class="{ 'strike': todo.complete }") {{ todo.text }}
        div.todo-remove
            span(
                class="pointer"
                @click="$emit('archive')"
            ) x
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="stylus">
.todo-item {
    transition: color .2s, background-color .2s;

    &.is-complete{
        background-color: #ddd;
        color: #aaa;
    }
}
</style>
