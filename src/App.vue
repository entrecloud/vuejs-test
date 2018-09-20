<template lang='pug'>
  section.mt6.mw5.center.w-100
    h1.tc.f3.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5.flex-column
      template(v-for='(todo, i) in todos')
        div.items-center.flex.shadow-3.br3(v-if="todos[i].complete===true && todos[i].status!='archived'", v-on:click="onCheck(todo)").h2.mb3.mt3
          input(type="checkbox" checked).ml3.mr3
          pre.flex-auto.fw3-ns.f4.strike-ns {{todo.title}}
          pre.ml3.mr3(v-on:click="onClose(todo, $event)") X
        div.items-center.flex.shadow-3.br3(v-if="todos[i].complete===false && todos[i].status!='archived'", v-on:click="onCheck(todo)").h2.mb3.mt3.b--mid-gray
          input(type="checkbox" unchecked).ml3.mr3
          pre.flex-auto.fw3-ns.f4 {{todo.title}}
          pre.ml3.mr3(v-on:click="onClose(todo, $event)") X
        //- TODO:
      input(placeholder="New Todo", v-on:keydown="addNew",  v-model="newTodo").h2.flex-auto.w-100.br3.mb3.pl2.pr2.fw3-ns.f4
    template(v-if="todos.filter((todo) => todo.status === 'archived').length")
      h1.tc.f4.fw5.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5
        template(v-for='(todo, i) in todos')
          //- TODO:
          div.items-center.flex.shadow-3.br3(v-if="todos[i].complete===true && todos[i].status==='archived'", v-on:click="onCheck(todo)").h2.mb3.mt3
            input(type="checkbox" checked).ml3.mr3
            pre.flex-auto.fw3-ns.f4.strike-ns {{todo.title}}
            pre.ml3.mr3(v-on:click="onClose(todo, $event)") X
          div.items-center.flex.shadow-3.br3(v-if="todos[i].complete===false && todos[i].status==='archived'", v-on:click="onCheck(todo)").h2.mb3.mt3.b--mid-gray
            input(type="checkbox" unchecked).ml3.mr3
            pre.flex-auto.fw3-ns.f4 {{todo.title}}
            pre.ml3.mr3(v-on:click="onClose(todo, $event)") X
</template>

<script>
import {mapState} from 'vuex'

export default {
  components: {},
  data: () => ({
    newTodo: ''
  }),
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    addNew (event) {
      if (event.key === 'Enter') {
        this.$store.dispatch('addNewTodo', this.newTodo)
        this.newTodo = ''
      }
    },
    onClose (item, event) {
      if (event) event.stopPropagation()
      this.$store.dispatch('closeItem', item)
    },
    onCheck (item) {
      this.$store.dispatch('updateTodo', item)
    }
  }
}
</script>
