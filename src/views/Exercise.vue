<template>
  <div id="app">
    <b-container>
      <p><b-button @click="addWorkout">New Workout</b-button></p>
      <b-list-group v-for="exercise in exercises" :key="exercise.id"><p><Exercise :exerciseId="exercise.id" :exerciseName="exercise.name"></Exercise></p></b-list-group>
    </b-container>
  </div>
</template>

<script>
import Exercise from "@/components/Exercise.vue";
import API from "@/mixins/API.vue";

export default {
  name: "app",
  data() {
    return {
      exercises: []
    };
  },
  components: {
    Exercise
  },
  mixins: [API],
  methods: {
    getExercises: function () {
      this.api.get('/exercise')
        .then(response => (this.exercises = response.data))
        .catch(error => (this.console.error(error)));
    },
    addWorkout: function () {
      this.exercises.push({id: 0, name: ""});
    }
  },
  created() {
    this.getExercises();
  }
};
</script>