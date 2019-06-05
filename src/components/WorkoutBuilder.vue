<template>
    <div id="WorkoutBuilder">
        <b-row>
            <b-col sm=3>
                <b-button @click="addSet">Add Set</b-button>
            </b-col>
            <b-col sm=3>
                <b-form-select v-model="selectedExerciseId" :options="exercises"></b-form-select>
            </b-col>
        </b-row>
        <div v-for="exercise in exercises" :key="exercise.value" v-show="filteredSets(exercise.value).length > 0">
        <h3>{{exercise.text}}</h3>
        <b-list-group>
            <b-list-group-item v-for="set in filteredSets(exercise.value)" :key="set.id">
                <Set :set="set" 
                     @update-reps="onRepsChange(set, $event)" 
                     @update-weight="onWeightChange(set, $event)"
                     @update-set="putSet(set)"
                     @delete-set="deleteSet(set)"></Set>
            </b-list-group-item>
        </b-list-group>
        </div>
             
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
            sets: [],
            exercises: [{id: 0, name: "No Exercises Found"}],
            selectedExerciseId: 1
        }
    },
    props: {
        workout: {
            id: Number,
            personId: Number,
            time: Date
        }
    },
    computed: {
    },
    methods: {
        getExercises() {
            this.api.get('/exercise')
                .then(response => (this.exercises = response.data.map(exercise => ({value: exercise.id, text: exercise.name}))))
                .catch(error => (this.console.error(error)));
        },
        getSets() {
            this.api.get('/workout/sets/' + this.workout.id)
                .then(response => (this.sets = response.data))
                .catch(error => (this.console.error(error)));
        },
        addSet() {
            var set = { 
                    id: null, 
                    exerciseId: this.selectedExerciseId,
                    workoutId: this.workout.id,
                    reps: 0,
                    weight: 0.0,
                    changed: false
                  };
            this.postSet(set);
            this.sets.push(set);
            
        },
        onRepsChange: function(set, event) {
            set.changed = true;
            set.reps = parseInt(event);
        },
        onWeightChange: function(set, event) {
            set.changed = true;
            set.weight = parseFloat(event);
        },
        postSet: function(set) {
            this.api.post('/set', {
                exerciseId: set.exerciseId,
                workoutId: set.workoutId,
                reps: set.reps,
                weight: set.weight
            })
            .then(response => (set.id = response.data.id))
            .catch(error => (this.console.error(error)));
        },
        putSet: function(set) {
            this.api.put('/set/' + set.id, {
                id: set.id,
                exerciseId: set.exerciseId,
                workoutId: set.workoutId,
                reps: set.reps,
                weight: set.weight
            })
            .then(() => (set.changed = false))
            .catch(error => (this.console.error(error)));
        },
        deleteSet: function(set) {
            this.api.delete('/set/' + set.id)
                .then(this.sets.splice(this.sets.indexOf(set),1))
                .catch(error => (this.console.error(error)));
        },
        filteredSets(id) {
            return this.sets.filter(s => (s.exerciseId == id));
        }
    },
    created () {
        this.getExercises();
        this.getSets();
    }
}
</script>