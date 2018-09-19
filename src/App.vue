<template lang='pug'>
  section.mt6.mw5.center.w-100
    h1.tc.f3.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5
      TodosList(
        :todos="todos",
        @toggle="handleToggle"
        @archive="handleArchive"
      )
      input(
        v-model="text",
        type="text",
        @keydown.enter="handleEnter"
        class="pa1 br2 ba b--light-silver w-100 new-todo"
        placeholder="New Todo"
      )
    template(v-if="archivedTodos.length > 0")
      h1.tc.f5.fw5.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5
        TodosList(
          :todos="archivedTodos",
          @toggle="handleToggle"
          @archive="handleRemove"
        )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodosList from './TodosList'

export default {
  components: {
    TodosList
  },
  data: () => ({ text: '' }),
  computed: {
    ...mapGetters({
      todos: 'ACTIVE_TODOS',
      archivedTodos: 'ARCHIVED_TODOS'
    })
  },
  methods: {
    handleRemove(id) {
      this.REMOVE_TODO({ id })
    },
    handleArchive(id) {
      this.ARCHIVE_TODO({ id })
    },
    handleToggle(id) {
      this.TOGGLE_TODO({ id })
    },
    handleEnter() {
      const { text } = this
      this.CREATE_TODO({ text })
      this.text = ''
    },
    ...mapActions(['CREATE_TODO', 'TOGGLE_TODO', 'ARCHIVE_TODO', 'REMOVE_TODO'])
  }
}
</script>