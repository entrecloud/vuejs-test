<template lang='pug'>
  section.mt6.mw5.center
    h1.tc.f4.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5
      template(v-for='(todo, i) in currentTodos')
        div.flex.items-center.mb3.br2.shadow-4.pa2(:class="{'bg-moon-gray': todo.complete, silver: todo.complete}")
          input.pointer(type="checkbox" :checked="todo.complete" :id="'chk'+i" @input="complete(todo)")
          label.fg.pl2.relative.pointer(:for="'chk'+i") {{ todo.title }}
            hr.ba.absolute(v-if="todo.complete" style="width: calc(100% - 1rem); top: 2px")
          button.bn.bg-transparent.pointer.outline-0(:class="{silver: todo.complete}" @click="archive(todo)") x
      div
        input.ba.b--light-silver.br2.shadow-4.w-100.pa2.border-box(v-model="todoTitle" ref="todo" @keydown.enter="createTodo")

    template(v-if="archivedTodos.length")
      h1.tc.f4.fw6.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5
        template(v-for='(todo, i) in archivedTodos')
          div.flex.items-center.mb3.br2.shadow-4.pa2(:class="{'bg-moon-gray': todo.complete, silver: todo.complete}")
            input.pointer(type="checkbox" :checked="todo.complete" :id="'chk_'+i" @input="complete(todo)")
            label.fg.pl2.relative.pointer(:for="'chk_'+i") {{ todo.title }}
              hr.ba.absolute(v-if="todo.complete" style="width: calc(100% - 1rem); top: 2px")
            button.bn.bg-transparent.pointer.outline-0(:class="{silver: todo.complete}" @click="remove(todo)") x
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default
{
  components: {},
  data: () => ({
    todoTitle: ''
  }),
  computed:
  {
    ...mapGetters(['currentTodos', 'archivedTodos'])
  },
  methods:
    {
      ...mapActions(['addTodo', 'archiveTodo', 'toggleComplete', 'removeTodo']),
      createTodo ()
      {
        this.addTodo({
          id: 0,
          title: this.todoTitle,
          complete: false,
          status: '',
        })
        this.todoTitle = ''
      },
      archive (todoItem)
      {
        this.archiveTodo(todoItem)
        this.$refs.todo.focus()
      },
      remove (todoItem)
      {
        this.removeTodo(todoItem)
        this.$refs.todo.focus()
      },
      complete (todoItem)
      {
        this.toggleComplete(todoItem)
        this.$refs.todo.focus()
      }
    }
}
</script>

<style>
  .fg
  {
    flex-grow: 1
  }
</style>
