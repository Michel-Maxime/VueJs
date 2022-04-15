import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        title: "ranger la chambre",
        time: 11,
        responsable: "Pierre",
        do: false,
      },
      {
        title: "faire la vaiselle",
        time: 2,
        responsable: "Paul",
        do: false,
      },
    ],
    indexEditTodo: null,
    newTodo: {
      title: "",
      time: 0,
      responsable: "",
      do: false,
    },
  },
  mutations: {
    ADD_TODO(state) {
      state.todos.push(state.newTodo);
      this.commit("DELETE_NEWTODO");
    },
    DELETE_INDEX(state) {
      state.indexEditTodo = null;
    },
    DELETE_NEWTODO(state) {
      state.newTodo = {
        title: "",
        time: 0,
        responsable: "",
        do: false,
      };
    },
    PUT_TODO(state) {
      state.todos[state.indexEditTodo] = state.newTodo;
      this.commit("DELETE_INDEX");
      this.commit("DELETE_NEWTODO");
    },
    PUT_NEWTODO(state, index) {
      state.newTodo = state.todos[index]; //issue => link to todos[index]
      state.indexEditTodo = index;
    },
    DELETE_TODO(state, index) {
      state.todos.splice(index, 1);
    },
    PATCH_TODO(state, index) {
      state.todos[index].do = !state.todos[index].do;
    },
  },
  actions: {
    addTodo({ commit }, newTodo) {
      commit("ADD_TODO", newTodo);
    },
    editTodo({ commit }, index) {
      commit("PUT_NEWTODO", index);
    },
    putTodo({ commit }) {
      commit("PUT_TODO");
    },
    deleteTodo({ commit }, index) {
      commit("DELETE_TODO", index);
    },
    patchTodo({ commit }, index) {
      commit("PATCH_TODO", index);
    },
  },
  getters: {
    todos: (state) => state.todos,
    indexEditTodo: (state) => state.indexEditTodo,
    newTodo: (state) => state.newTodo,
  },
});
