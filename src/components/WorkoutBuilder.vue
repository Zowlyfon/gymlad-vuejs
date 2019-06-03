<template>
    <div class="WorkoutBuilder">
        <b-row>
            <b-col sm=3>
                <b-button>Add Set</b-button>
            </b-col>
            <b-col sm=3>
                <b-form-select v-model="selectedExerciseId" :options="exercises"></b-form-select>
            </b-col>
        </b-row>
        <b-list-group>
            <b-list-group-item v-for="set in sets" :key="set.id">
                <Set :exerciseId="set.exerciseId" :workoutId="workout.id"></Set>      
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import API from '@/mixins/API.vue'
import Set from '@/components/Set.vue'

export default {
    name: 'WorkoutBuilder',
    mixins: [API],
    components: {
        Set
    },
    data() {
        return {
            workout: {
                id,
                personId,
                time
            },
            sets: [],
            exercises: [],
            selectedExerciseId: 1
        }
    },
    methods: {
        getExercises() {
            this.api.get('/exercise')
                .then(response => (this.exercises = response.data))
                .catch(error => (this.console.error(error)));
        }
    },
    created () {
        getExercises();
    }
}
</script>