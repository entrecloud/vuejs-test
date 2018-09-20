import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [{
      id: 0,
      title: 'One',
      complete: false
    }]
  },
  mutations: {
    addTodo (state, newString) {
      const newItem = {
        id: parseInt(Math.random() * 1000),
        title: newString,
        complete: false
      }
      state.todos.push(newItem)
    },
    removeTodo (state, item) {
      const index = state.todos.findIndex(element => element.id === item.id)
      state.todos.splice(index, 1)
    },
    updateTodo (state, item) {
      const index = state.todos.findIndex(element => element.id === item.id)
      const tempTodos = [...state.todos]
      tempTodos[index] = item
      state.todos = tempTodos
    }
  },
  actions: {
    addNewTodo ({commit, state}, newString) {
      commit('addTodo', newString)
    },
    updateTodo ({commit, state}, item) {
      item.complete = !item.complete
      commit('updateTodo', item)
    },
    closeItem ({commit, state}, item) {
      if (item.status) {
        commit('removeTodo', item)
      } else {
        item.status = 'archived'
        commit('updateTodo', item)
      }
    }
  }
})
