import Vue from 'vue'
import Router from 'vue-router'
import Exercise from '@/views/Exercise.vue'
import Workout from '@/views/Workout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercise
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: Workout
    }
  ]
})
