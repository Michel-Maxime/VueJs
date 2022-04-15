<template>
  <div>
    <!-- <button @click="test">Test button</button> -->
    <input v-model="getNewTodo.title" type="text" />
    <input v-model="getNewTodo.time" type="number" min="0" />
    <select v-model="getNewTodo.responsable">
      <option v-for="(responsable, index) in allRespondable" :key="index">
        {{ responsable }}
      </option>
    </select>
    <button @click="addTaskToStore">Add Todo</button>

    <div
      :style="{ border: 'solid' }"
      v-for="(task, index) in getTodos"
      :key="index"
      :class="{ red: task.do }"
    >
      <div @click="toogleState(index)">
        <p>title: {{ task.title }}</p>
        <p>time : {{ task.time }}</p>
        <p>responsable : {{ task.responsable }}</p>
      </div>
      <button @click="deleteTodo(index)">Delete</button>
      <button @click="editTodo(index)">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  data() {
    return {
      allRespondable: ["Pierre", "Paul", "Jack", "Jean"],
    };
  },
  methods: {
    // with store
    test() {
      console.log(this.$store.state);
    },
    addTaskToStore() {
      if (!this.canSubmitNewTodo()) {
        alert("Oups something wrong !!");
        return;
      }
      if (this.getIndexEditTodo === null) {
        this.$store.dispatch("addTodo");
      } else {
        this.$store.dispatch("putTodo");
      }
    },

    editTodo(index) {
      this.$store.dispatch("editTodo", index);
    },

    deleteTodo(index) {
      this.$store.dispatch("deleteTodo", index);
    },
    canSubmitNewTodo() {
      var responsable = this.getTodos.filter(
        (v) => v.responsable === this.getNewTodo.responsable
      );
      var responsableTasks = responsable.length;

      var responsableTime = responsable.reduce((accumulator, object) => {
        return accumulator + object.time;
      }, 0);
      console.log(responsableTasks, responsableTime, this.getNewTodo);
      if (
        responsableTasks >= 3 ||
        responsableTime > 10 ||
        this.getNewTodo.title.length === 0 ||
        this.getNewTodo.responsable.length === 0 ||
        this.getNewTodo.time == 0
      ) {
        return false;
      }
      return true;
    },
    toogleState(index) {
      this.$store.dispatch("patchTodo", index);
    },
  },

  computed: {
    getTodos() {
      return this.$store.getters.todos;
    },
    getIndexEditTodo() {
      return this.$store.getters.indexEditTodo;
    },
    getNewTodo() {
      return this.$store.getters.newTodo;
    },
  },
};
</script>

<style scoped>
.red {
  background-color: rgb(170, 241, 135);
}
</style>
