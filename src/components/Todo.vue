<template>
  <div>
    <input v-model="newTodo" type="text" />
    <input v-model="newTime" type="number" min="0" />
    <select @change="switchView($event.target.selectedIndex)">
      <option v-for="(responsable, index) in allRespondable" :key="index">
        {{ responsable }}
      </option>
    </select>
    <button @click="addTask">Add Todo</button>

    <div
      :style="{ border: 'solid' }"
      v-for="(task, index) in tasks"
      :key="index"
      @click="toogleState(index)"
      :class="{ red: task.do }"
    >
      <p>title: {{ task.title }}</p>
      <p>time : {{ task.time }}</p>
      <p>responsable : {{ task.responsable }}</p>

      <button @click="deleteTask(index)">Delete</button>
      <button @click="editTask(index)">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  data() {
    return {
      newTodo: "",
      newTime: 0,
      newResponsableIndex: 0,
      allRespondable: ["Pierre", "Paul", "Jack", "Jean"],
      indexEditTodo: null,
      tasks: [
        {
          title: "ranger la chambre",
          time: 11,
          responsable: "Pierre",
          do: false,
        },
        {
          title: "faire la vaiselle",
          time: 2,
          responsable: "Jean",
          do: false,
        },
      ],
    };
  },
  methods: {
    addTask() {
      if (!this.canSubmit()) {
        alert("Oups something wrong !!");
        return;
      }
      if (this.indexEditTodo === null) {
        this.tasks.push({
          title: this.newTodo,
          time: +this.newTime,
          responsable: this.allRespondable[this.newResponsableIndex],
        });
      } else {
        this.tasks[this.indexEditTodo].title = this.newTodo;
        this.tasks[this.indexEditTodo].time = this.newTime;
        this.tasks[this.indexEditTodo].responsable =
          this.allRespondable[this.newResponsableIndex];

        this.indexEditTodo = null;
      }
      this.newTodo = "";
      this.newTime = 0;
    },

    editTask(index) {
      this.newTodo = this.tasks[index].title;
      this.newTime = this.tasks[index].time;
      this.indexEditTodo = index;
    },

    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    switchView(selectedIndex) {
      this.newResponsableIndex = selectedIndex;
    },

    canSubmit() {
      var responsable = this.tasks.filter(
        (v) => v.responsable === this.allRespondable[this.newResponsableIndex]
      );
      var responsableTasks = responsable.length;

      var responsableTime = responsable.reduce((accumulator, object) => {
        return accumulator + object.time;
      }, 0);

      if (
        responsableTasks >= 3 ||
        responsableTime > 10 ||
        this.newTodo.length === 0 ||
        this.newTime == 0
      ) {
        return false;
      }
      return true;
    },
    toogleState(index) {
      this.tasks[index].do = !this.tasks[index].do;
    },
  },
};
</script>

<style scoped>
.red {
  background-color: rgb(170, 241, 135);
}
</style>
