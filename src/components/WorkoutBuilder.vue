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
                <b-row align-v="center">
                    <b-col sm=1>
                        {{ set.exerciseId }}
                    </b-col>
                    <b-col sm=1>
                        Reps:
                    </b-col>
                    <b-col sm=1>
                        <b-form-input v-model="set.reps" 
                                      @change="setChange(set)"
                                      type="number"></b-form-input> 
                    </b-col>
                    <b-col sm=1>
                        Weight:
                    </b-col>
                    <b-col sm=1>
                        <b-form-input v-model="set.weight"
                                      @change="setChange(set)"
                                      type="number"></b-form-input>
                    </b-col>
                    <b-col sm=1 v-show="set.changed">
                        <b-button @click="putSet(set)">Update</b-button>
                    </b-col>
                    <b-col sm=1>
                        <b-button @click="deleteSet(set)" 
                                  variant="danger">Delete</b-button>
                    </b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>
        </div>
             
    </div>
</template>

<script>
import API from '@/mixins/API.vue'
//import Set from '@/components/Set.vue'

export default {
    name: 'WorkoutBuilder',
    mixins: [API],
    components: {
        //Set
    },
    data() {
        return {
            workout: {
                id: null,
                personId: 1,
                time: null
            },
            sets: [],
            exercises: [{id: 0, name: "No Exercises Found"}],
            selectedExerciseId: 1
        }
    },
    props: {
        workoutId: Number,
        workoutPersonId: Number,
        workoutTime: Date
    },
    computed: {
    },
    methods: {
        getExercises() {
            this.api.get('/exercise')
                .then(response => (this.exercises = response.data.map(exercise => ({value: exercise.id, text: exercise.name}))))
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
        setChange(set) {
            set.changed = true;
        },
        postSet: function(set) {
            this.api.post('/set', {
                exerciseId: set.id,
                workoutId: set.workoutId,
                reps: set.reps,
                weight: set.weight
            })
            .then(response => (set.id = response.data.id))
            .catch(error => (this.console.error(error)));
        },
        putSet: function(set) {
            this.api.put('/set/' + set.id, {
                exerciseId: set.id,
                workoutId: set.workoutId,
                reps: set.reps,
                weight: set.weight
            })
            .then(set.changed = false)
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
    }
}
</script>