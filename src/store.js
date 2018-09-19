import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// TYPES
const MUTATIONS = {
  CREATE_TODO: 'CREATE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  ARCHIVE_TODO: 'ARCHIVE_TODO'
}

const ACTIONS = {
  CREATE_TODO: 'CREATE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  ARCHIVE_TODO: 'ARCHIVE_TODO'
}

const GETTERS = {
  ALL_TODOS: 'ALL_TODOS',
  ACTIVE_TODOS: 'ACTIVE_TODOS',
  ARCHIVED_TODOS: 'ARCHIVED_TODOS'
}

const createNewTodo = ({ id, text }) => ({
  id,
  text,
  complete: false
})

export default new Vuex.Store({
  state: {
    todos: [{
      id: 0,
      text: 'One',
      complete: false
    }]
  },
  mutations: {
    [MUTATIONS.CREATE_TODO]: (state, { text }) => {
      state.todos.push(createNewTodo({ id: state.todos.length + 1, text }))
    },
    [MUTATIONS.TOGGLE_TODO]: ({ todos }, { id }) => {
      const todo = todos.find(todo => todo.id === id)
      Vue.set(todo, 'complete', !todo.complete)
    },
    [MUTATIONS.REMOVE_TODO]: (state, { id }) => {
      const todoIndex = state.todos.findIndex(todo => todo.id === id)
      state.todos.splice(todoIndex, 1)
    },
    [MUTATIONS.ARCHIVE_TODO]: ({ todos }, { id }) => {
      const todo = todos.find(todo => todo.id === id)
      Vue.set(todo, 'archived', !todo.archived)
    }
  },
  actions: {
    [ACTIONS.CREATE_TODO]: ({ commit }, { text }) => {
      commit(MUTATIONS.CREATE_TODO, { text })
    },
    [ACTIONS.TOGGLE_TODO]: ({ commit }, { id }) => {
      commit(MUTATIONS.TOGGLE_TODO, { id })
    },
    [ACTIONS.REMOVE_TODO]: ({ commit }, { id }) => {
      commit(MUTATIONS.REMOVE_TODO, { id })
    },
    [ACTIONS.ARCHIVE_TODO]: ({ commit }, { id }) => {
      commit(MUTATIONS.ARCHIVE_TODO, { id })
    }
  },
  getters: {
    [GETTERS.ALL_TODOS]: ({ todos }) => {
      return todos
    },
    [GETTERS.ACTIVE_TODOS]: (_, { ALL_TODOS }) => {
      return ALL_TODOS.filter(todo => !todo.archived)
    },
    [GETTERS.ARCHIVED_TODOS]: (_, { ALL_TODOS }) => {
      return ALL_TODOS.filter(todo => !!todo.archived)
    }
  }
})
