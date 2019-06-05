<template>
    <div id='workout'>
        <h2>Workouts</h2>
        <b-row>
            <b-col sm=2>
                <b-button @click="postWorkout">New Workout</b-button>
            </b-col>
            <b-col sm=2>
                <b-form-input v-model="selectedDate" type="date"></b-form-input>
            </b-col>
            <b-col sm=2>
                <b-form-input v-model="selectedTime" type="time"></b-form-input>
            </b-col>
        </b-row>
        <p></p>
        <b-row>
            <b-col>
            <b-tabs>
                <b-tab title="Previous Workouts" class="mt-3">
                    <b-list-group>
                        <b-list-group-item v-for="workout in workouts" :key="workout.id"> 
                        <b-row>
                            <b-col sm="3">
                                <h4>{{workout.time}}</h4>
                            </b-col>
                            <b-col sm="1">
                                <b-button @click="editWorkout(workout)">Edit</b-button>
                            </b-col>
                            <b-col sm="1">
                                <b-button @click="deleteWorkout(workout)" variant="danger">Delete</b-button>
                            </b-col>
                        </b-row>
                        </b-list-group-item>
                    </b-list-group>
                </b-tab>
                <b-tab v-for="builder in builders" :key="builder.id" :title="builder.time">
                    <WorkoutBuilder :workout="builder"></WorkoutBuilder>
                </b-tab>
            </b-tabs>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import WorkoutBuilder from '@/components/WorkoutBuilder.vue'

import API from '@/mixins/API.vue'

export default {
    name: 'workout',
    components: {
        WorkoutBuilder
    },
    mixins: [API],
    data() {
        return {
            workouts: [],
            builders: [],
            selectedDate: null,
            selectedTime: null,
            personId: 1
        }
    },
    computed: {
        selectedDateTime: function() {
            return new Date(this.selectedDate + 'T' + this.selectedTime);
        }
    },
    methods: {
        editWorkout: function(workout) {
            this.builders.push(workout);
        },
        getWorkouts: function() {
            this.api.get('/workout')
                .then(response => (this.workouts = response.data))
                .catch(error => (this.console.error(error)));
        },
        postWorkout: function() {
            this.api.post('/workout', {
                time: this.selectedDateTime,
                personId: this.personId
            })
            .then(response => {
                this.builders.push(response.data);
                this.workouts.push(response.data);
            })
            .catch(error => (this.console.error(error)));
        },
        deleteWorkout: function(workout) {
            this.api.delete('/workout/' + workout.id)
                .then(this.workouts.splice(this.workouts.indexOf(workout),1))
                .catch(error => (this.console.error(error)));
        }
    },
    created() {
        this.getWorkouts();
    }
}
</script>