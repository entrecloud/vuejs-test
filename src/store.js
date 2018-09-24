import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters:
    {
      currentTodos: state => state.todos.filter(todo => todo.status !== 'archived'),
      archivedTodos: state => state.todos.filter(todo => todo.status === 'archived'),
    },
  mutations:
    {
      addTodo (state, todoItem)
      {
        state.todos.push(todoItem)
      },
      archiveTodo (state, index)
      {
        state.todos[index].status = 'archived'
      },
      toggleComplete (state, index)
      {
        state.todos[index].complete = !state.todos[index].complete
      },
      removeTodo (state, index)
      {
        state.todos.splice(index, 1)
      },
    },
  actions:
    {
      addTodo ({commit}, todoItem)
      {
        commit('addTodo', todoItem)
      },
      archiveTodo ({commit, state}, todoItem)
      {
        commit('archiveTodo', state.todos.indexOf(todoItem))
      },
      toggleComplete ({commit, state}, todoItem)
      {
        commit('toggleComplete', state.todos.indexOf(todoItem))
      },
      removeTodo ({commit, state}, todoItem)
      {
        commit('removeTodo', state.todos.indexOf(todoItem))
      },
    },
  strict: process.env.NODE_ENV !== 'production'
})
