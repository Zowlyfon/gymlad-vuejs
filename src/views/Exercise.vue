<template>
  <div id="app">
    <b-list-group v-for="exercise in exercises" :key="exercise.id"><Exercise :exerciseId="exercise.id" :exerciseName="exercise.name"></Exercise></b-list-group>
    
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
    }
  },
  created() {
    this.getExercises();
  }
};
</script>