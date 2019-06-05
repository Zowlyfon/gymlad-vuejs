<template>
  <div class="exercise">
    <h2>Exercises</h2>
    <p><b-button @click="addExercise" variant="success">New Exercise</b-button></p>
    <b-list-group>
      <Exercise v-for="exercise in exercises" 
        :key="exercise.id" 
        :exerciseId="exercise.id" 
        :exerciseName="exercise.name"></Exercise>
    </b-list-group>  
  </div>
</template>

<script>
import Exercise from "@/components/Exercise.vue";
import API from "@/mixins/API.vue";

export default {
  name: "exercise",
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
    addExercise: function () {
      this.exercises.push({id: 0, name: ""});
    }
  },
  created() {
    this.getExercises();
  }
};
</script>